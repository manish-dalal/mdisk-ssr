import React, { useState } from 'react';
import Head from 'next/head';

import { getHost, iHostname } from '../utils';
import { pushToDataLayer } from '../utils/google-analytics';
import Dood from '../components/video/Dood';
import Mdisk from '../components/video/Mdisk';
import FooterAds from '../components/FooterAds';
import styles from '../styles/video.module.css';

const thumbImage =
  'https://drive.google.com/uc?export=view&id=1GK6SH3Kwgu-Nwr4ilQPyiKuk26tbZmxb';

const Post = (props) => {
  const { video, type, videoId, hostname } = props;

  const [isLoading, setIsLoading] = useState(props.isLoading);

  const [dimensions, setdimensions] = useState({ height: 100, width: 320 });

  const setDimensions = (params) => setdimensions({ ...dimensions, ...params });
  React.useEffect(() => {
    const height =
      window.innerHeight < 780 ? window.innerHeight : window.innerHeight - 10;
    const epWidth =
      window.innerWidth < 480 ? window.innerWidth : window.innerWidth - 20;
    const width =
      epWidth >= height ? epWidth - (epWidth - height) / 3 : epWidth;
    setDimensions({ width, height: Math.min(height, width), epWidth });
  }, []);

  const frameWidthStyle = type === 'm' ? { maxWidth: 480 } : {};
  const footerStyle =
    type === 'm' ? { position: 'unset' } : { backgroundColor: '#434645' };
  const pageTitle = video?.filename || (type === 'm' ? 'Mdisk' : 'Doodstream');
  return (
    <div
      className={` ${styles.videoapp} ${type === 'm' ? styles.mdiskapp : ''}`}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta property='og:title' content={pageTitle} key='title'></meta>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        ></meta>
        <meta name='twitter:image' content={video.image || thumbImage}></meta>
        <meta name='og:image' content={video.image || thumbImage}></meta>
      </Head>
      <div className={styles.adheader} style={frameWidthStyle}>
        <div
          className={styles.adoverlay}
          onClick={() => {
            window.open('https://t.me/primexmov', '_blank');
            pushToDataLayer({ event: 'click_header', id: videoId || '' });
          }}
        />
      </div>
      {type === 'd' ? (
        <Dood
          height={dimensions.height}
          width={dimensions.width}
          videoId={videoId}
          onClick={() => {
            // setisClickedIframe(true);
          }}
          onLoad={() => setIsLoading(false)}
          video={video}
        />
      ) : (
        <Mdisk
          width={dimensions.epWidth}
          onClick={() => {
            // setisClickedIframe(true);
          }}
          video={video}
        />
      )}
      <div className={styles.adfooter} style={footerStyle}>
        <FooterAds isLoading={isLoading} hostname={hostname} />
      </div>
    </div>
  );
};

export default Post;
export async function getServerSideProps(context) {
  const videoId = context.params.vid;
  const type = getHost(context) === iHostname[0] ? 'd' : 'm';

  const props = {
    type,
    videoId,
    video: null,
    isLoading: true,
    hostname: getHost(context),
  };

  if (type === 'm') {
    try {
      const response = await fetch(
        `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`
      );
      props.video = await response.json();
      props.isLoading = false;
    } catch (error) {
      props.isLoading = false;
      console.log('Mdisk error', error);
    }
  } else {
    try {
      const response = await fetch(
        `https://doodapi.com/api/file/info?key=72288nzohhhv0hp933n07&file_code=${videoId}`
      );
      const { result } = await response.json();
      if (result && result.length) {
        const { single_img = '', title = '' } = result[0];
        props.video = { image: single_img, filename: title, ...result[0] };
      }
    } catch (error) {
      console.log('Dood error', error);
    }
  }

  console.log('video', props.video);
  return { props };
}
