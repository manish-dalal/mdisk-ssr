import React from 'react';
import moment from 'moment';
import Script from 'next/script';

import { videoSize } from '../../utils';
import { convertToMMSS } from '../../utils/mdisk';
import styles from './dood.module.css';

export default function Dood({ videoId, height, width, onLoad, video }) {
  return (
    <div className='dood'>
      <Script
        src='https://res.cloudinary.com/mdiskapp/raw/upload/v1658599010/fontawesome_fdryvd.js'
        crossOrigin='anonymous'
      ></Script>
      <iframe
        id='dood-element'
        src={`https://dood.re/e/${videoId}`}
        height={height}
        width={width}
        title='Doodstream'
        scrolling='no'
        frameBorder={0}
        allowFullScreen={true}
        onLoad={onLoad}
      />
      {video && (
        <div className={styles.titlewrap} style={{ width }}>
          <h4>{video.title}</h4>
          <div className={styles.videoDetail}>
            <div className={styles.length}>
              <i className='far fa-clock mr-1'></i>{' '}
              {convertToMMSS(video.length)}
            </div>
            <div className={styles.size}>
              <i className='far fa-save mr-1'></i> {videoSize(video.size)}
            </div>
            <div className={styles.uploadate}>
              <i className='far fa-calendar-alt mr-1'></i>
              {moment().format('MMM DD, YYYY')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
