import React, { useEffect } from 'react';
import styles from './mdisk.module.css';
import Report from '../Report';
import Play from '../MdiskInfo/Play';
import MdiskDetail from '../MdiskInfo/MdiskDetail';

export default function Mdisk({ height, videoData }) {
  // if (!videoData.id) {
  //   return (
  //     <div
  //       className={styles.mdiskCp}
  //       style={{ color: 'red', minHeight: 200, padding: 10 }}
  //     >
  //       Resource Not Found
  //     </div>
  //   );
  // }
  return (
    <div className={styles.mdiskCp} style={{ height }}>
      <Report videoData={videoData} />
      <Play videoData={videoData} />
      <MdiskDetail videoData={videoData} />
    </div>
  );
}