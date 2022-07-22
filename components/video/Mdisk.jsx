import React, { useEffect } from 'react';
import styles from './mdisk.module.css';
import Report from '../Report';
import Play from '../MdiskInfo/Play';
import MdiskDetail from '../MdiskInfo/MdiskDetail';

export default function Mdisk({ height, videoData }) {
  if (!videoData) {
    return (
      <div className={styles.mdiskCp} style={{ color: 'red' }}>
        Resource Not Found
      </div>
    );
  }
  return (
    <div className={styles.mdiskCp} style={{ height }}>
      <Report videoData={videoData} />
      <Play videoData={videoData} />
      <MdiskDetail videoData={videoData} />
    </div>
  );
}
