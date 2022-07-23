import React, { useState } from 'react';

import { getHost, iHostname } from '../utils';
import { transformMdiskGet, isIOS } from '../utils/mdisk';
import { pushToDataLayer } from '../utils/google-analytics';
import Dood from '../components/video/Dood';
import Mdisk from '../components/video/Mdisk';
import FooterAds from '../components/FooterAds';
import styles from '../styles/video.module.css';

const Post = (props) => {
  console.log('props', props);
  const { video, type, videoId, hostname } = props;
  const [videoData, setvideoData] = useState({
    id: '',
    owner: '****',
    name: '',
    fromUser: '',
    duration: 0,
    poster: '',
    isDeeplink: false,
    useOnlinePlayer: false,
    useOnlineDownloader: false,
    size: 0,
    width: 848,
    height: 480,
    publishTime: 0,
  });
  const [isLoading, setIsLoading] = useState(props.isLoading);

  const [dimensions, setdimensions] = useState({ height: 100, width: 100 });

  const setDimensions = (params) => setdimensions({ ...dimensions, ...params });
  React.useEffect(() => {
    const tVideo = video && transformMdiskGet(video);
    setvideoData(tVideo);

    const height =
      window.innerHeight < 780 ? window.innerHeight : window.innerHeight - 10;
    const epWidth =
      window.innerWidth < 480 ? window.innerWidth : window.innerWidth - 20;
    const width =
      epWidth >= height ? epWidth - (epWidth - height) / 3 : epWidth;
    setDimensions({ width, height: Math.min(height, width), epWidth });
  }, []);

  const frameWidthStyle =
    type === 'm' ? { width: Math.min(480, dimensions.width) } : {};
  const footerStyle =
    type === 'm' ? { position: 'unset' } : { backgroundColor: '#434645' };
  return (
    <div
      className={` ${styles.videoapp} ${type === 'm' ? styles.mdiskapp : ''}`}
    >
      {type === 'd' ? (
        <Dood
          height={dimensions.height}
          width={dimensions.width}
          videoId={videoId}
          onClick={() => {
            // setisClickedIframe(true);
          }}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Mdisk
          width={dimensions.epWidth}
          onClick={() => {
            // setisClickedIframe(true);
          }}
          videoData={videoData}
        />
      )}
      <div className={styles.adheader} style={frameWidthStyle}>
        <div
          className={styles.adoverlay}
          onClick={() => {
            window.open('https://t.me/primexmov', '_blank');
            pushToDataLayer({ event: 'click_header', id: videoId || '' });
          }}
        />
      </div>
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
  console.log('router.query', context.params.vid);
  if (type === 'm') {
    const response = await fetch(
      `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`
    );
    props.video = await response.json();
    props.isLoading = false;
  }

  return { props };
}
