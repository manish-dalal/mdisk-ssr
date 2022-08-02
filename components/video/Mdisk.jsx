import React, { useEffect, useState } from 'react';
import styles from './mdisk.module.css';
import Report from '../Report';
import Play from '../MdiskInfo/Play';
import MdiskDetail from '../MdiskInfo/MdiskDetail';
import { transformMdiskGet, isIOS } from '../../utils/mdisk';

export default function Mdisk({ height, video, videoId }) {
  const [videoData, setvideoData] = useState({
    id: '',
    owner: '****',
    name: video?.filename,
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
    videoId
  });
  React.useEffect(() => {
    if (video) {
      const tVideo = transformMdiskGet(video, videoId);
      setvideoData(tVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!videoData.name) {
    return (
      <div
        className={styles.mdiskCp}
        style={{ color: 'red', minHeight: 200, padding: 10 }}
      >
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
