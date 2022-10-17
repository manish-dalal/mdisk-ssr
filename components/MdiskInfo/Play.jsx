import React, { useRef, useEffect } from 'react';

import styles from './Play.module.css';
import {
  onPlay,
  convertToMMSS,
  // isIOS,
  onSimplePlay,
  onDownload,
  onSimpleDownload,
} from '../../utils/mdisk';

export default function Play({ videoData }) {
  // const [showOtherOptions, setshowOtherOptions] = useState(false);
  const handleFun = useRef(null);

  useEffect(() => {
    if (handleFun.current && videoData.id) {
      handleFun.current(videoData);
      handleFun.current = null;
    }
  }, [videoData]);

  const handleWaitFunction = (fun = () => {}) => {
    if (videoData?.id) {
      fun(videoData);
    } else {
      handleFun.current = fun;
    }
  };
  return (
    <div className={styles.play}>
      <div
        className={styles.diskvideo}
        style={{
          height: Math.min(500, 480) * 0.6428571428571429,
        }}
        onClick={() =>
          handleWaitFunction((dataObj) =>
            videoData.useSimplePlayerOnly
              ? onSimplePlay('splayonlineClickedSp', dataObj || videoData)
              : onPlay('playButtonClickedSp', dataObj || videoData)
          )
        }
      >
        <div className={styles.videocover}>
          <div className={styles.videoplay}></div>
          <div className={styles.videotext}>Click to play</div>
        </div>
        <div
          className={`${styles.videoduration} ${styles.t14} ${styles.twhite}`}
        >
          {convertToMMSS(videoData ? videoData.duration : 0)}
        </div>
      </div>
      {!videoData.useSimplePlayerOnly && (
        <ul className={styles.diskbtns}>
          <li>
            <div
              className={`${styles.btnitem} ${styles.twhite} ${styles.t12}`}
              onClick={() =>
                handleWaitFunction((dataObj) =>
                  onDownload(dataObj || videoData)
                )
              }
            >
              <span className={`${styles.btntxt} ${styles.btndownload}`}>
                Download (MX)
              </span>
            </div>
          </li>
          <li>
            <div
              className={`${styles.btnitem} ${styles.twhite} ${styles.t12}`}
              onClick={() =>
                handleWaitFunction((dataObj) =>
                  onPlay('playonlineClickedSp', dataObj || videoData)
                )
              }
            >
              <span className={`${styles.btntxt} ${styles.btnplay}`}>
                Play Online (MX)
              </span>
            </div>
          </li>
        </ul>
      )}
      {/* {showOtherOptions && ( */}
      {!videoData?.isDeeplink && (
        <div className={styles.simpleplayer2}>
          <div className={styles.optiontitle}>
            {!videoData.useSimplePlayerOnly ? `Option2 (SPlayer)` : ''}
          </div>

          <ul className={styles.diskbtns}>
            <li>
              <div
                className={`${styles.btnitem} ${styles.twhite} ${styles.t12}`}
                onClick={() =>
                  handleWaitFunction((dataObj) =>
                    onSimpleDownload(dataObj || videoData)
                  )
                }
              >
                <span className={`${styles.btntxt} ${styles.btndownload}`}>
                  Download (SP)
                </span>
              </div>
            </li>
            <li>
              <div
                className={`${styles.btnitem} ${styles.twhite} ${styles.t12}`}
                onClick={() =>
                  handleWaitFunction((dataObj) =>
                    onSimplePlay('splayonlineClickedSp', dataObj || videoData)
                  )
                }
              >
                <span className={`${styles.btntxt} ${styles.btnplay}`}>
                  Play Online (SP)
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}
      {/* )} */}
      {/* {!isIOS && !showOtherOptions && (
        <div
          className='option-toggle'
          onClick={() => setshowOtherOptions(true)}
        >
          MORE PLAYER
        </div>
      )} */}
    </div>
  );
}
