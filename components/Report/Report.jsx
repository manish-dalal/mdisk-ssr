import React, { useState } from 'react';
import styles from './report.module.css';
// import { useParams } from 'react-router-dom';
import { pushToDataLayer } from '../../utils/google-analytics';

const getNameArr = (str = '') => {
  try {
    let inString = new String(str);
    const result = [];
    const iterator = inString.matchAll(/@.[a-zA-Z0-9_-]*/g);
    let lastCursor = 0;
    for (const el of iterator) {
      const { 0: text, index } = el;
      const startIndex = lastCursor;
      result.push(
        {
          text: inString.slice(startIndex, index),
          link: '',
        },
        {
          text: text,
          link: `https://telegram.dog/${text.replace('@', '')}`,
        }
      );
      lastCursor = index + text.length + 1;
    }
    result.push({
      text: inString.slice(lastCursor, inString.length),
      link: '',
    });
    return result;
  } catch (error) {
    return [];
  }
};

export default function Report({ videoData }) {
  // let { videoId = '' } = useParams();
  const [show, setshow] = useState(false);

  const onClose = (reason = '') => {
    setshow(false);
    if (reason && typeof reason === 'string') {
      pushToDataLayer({
        event: 'video_report',
        id: videoData.videoId || '',
        reason,
      });
    }
  };
  const nameArr = getNameArr(videoData.name);
  return (
    <div className={styles.reportbox}>
      <div className={styles.tellipsis}>
        <div className={styles.tscroll} title={videoData.name}>
          {nameArr.length
            ? nameArr.map((el, i) => (
                <span
                  key={`namekey-${i}`}
                  className={el.link && styles.link}
                  onClick={() => {
                    el.link && window.open(el.link, '_blank');
                  }}
                >
                  {el.text}&nbsp;
                </span>
              ))
            : videoData.name}
        </div>
      </div>
      <div
        className={styles.report}
        onClick={() => {
          setshow(true);
        }}
      >
        <div className={styles.warning}></div>
        <div className={styles.labelreport}>Report</div>
      </div>
      {show && (
        <div className={styles.mxevtreportmodal} onClick={onClose}>
          <div className={styles.mainbody}>
            <div className={styles.title}>
              Report video
              <div className={styles.close} onClick={onClose}></div>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'spam')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Spam</span>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'violence')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Violence</span>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'pornography')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Pornography</span>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'child abuse')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Child Abuse</span>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'Copyright')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Copyright</span>
            </div>
            <div
              className={styles.listItem}
              onClick={onClose.bind(this, 'other')}
            >
              <div className={styles.radio}></div>
              <span className={styles.type}>Other</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
