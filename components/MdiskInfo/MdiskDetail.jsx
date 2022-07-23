import React from 'react';
import moment from 'moment';

import styles from './MdiskDetail.module.css';
import { videoSize } from '../../utils';

export default function MdiskInfo({ videoData }) {
  const {
    owner = '',
    publishTime,
    width = 0,
    height = 0,
    size: fileSize,
  } = videoData;

  return (
    <div className={styles.MdiskDetail}>
      <div className={styles.diskdetails}>
        <div className={styles.t12}>
          <div className={styles.infotitle}>Video Information</div>
          {owner && (
            <span className={styles.infouser}>{`${owner.substr(
              0,
              2
            )}***${owner.substr(-2, 2)} · `}</span>
          )}
          {publishTime && (
            <span className={styles.infotime}>{` ${moment().format(
              'D MMM YYYY'
            )} · `}</span>
          )}
          {!!(width || height) && (
            <span
              className={styles.inforesolution}
            >{`${width}*${height} · `}</span>
          )}
          {fileSize !== undefined && (
            <span className={styles.infosize}>{videoSize(fileSize)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
