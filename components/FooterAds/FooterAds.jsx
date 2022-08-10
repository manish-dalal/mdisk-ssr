import React, { useEffect, useState, useRef } from 'react';
import styles from './FooterAds.module.css';
import { getMobileOS } from '../../utils/get-mobile-os';

let adPageSize = getMobileOS() === 'Android' ? 10 : 1;
let loadCount = getMobileOS() === 'Android' ? 40 : 1;

export default function MdiskInfo({ isLoading, exoAdsArr }) {
  const [count, setcount] = useState(adPageSize);
  const timerRef = useRef(null);
  // const adseraId = getAdsteraNativeAd();

  useEffect(() => {
    if (!isLoading) {
      window.AdProvider = window?.AdProvider || [];
      window.AdProvider.push({ serve: {} });
      var jsElm1 = document.createElement('script');
      jsElm1.async = true;
      jsElm1.type = 'application/javascript';
      jsElm1.src = 'https://a.exdynsrv.com/ad-provider.js';
      document.head.appendChild(jsElm1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
    let regexp = /(america)|(asia)|(africa)/gim;
    if (!(resolvedOptions.timeZone && regexp.test(resolvedOptions.timeZone))) {
      loadCount = 1;
      adPageSize = 1;
      setcount(1);
    }
    if (!isLoading && loadCount > count) {
      timerRef.current = setTimeout(() => {
        const nextCount = count + adPageSize;
        if (count < exoAdsArr.length) {
          setcount(nextCount);
          window.AdProvider.push({ serve: {} });
        } else {
          timerRef.current && clearTimeout(timerRef.current);
        }
      }, 1000);
      return () => timerRef.current && clearTimeout(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, count]);

  const paginateArr = exoAdsArr.slice(
    0,
    count > exoAdsArr.length ? exoAdsArr.length : count
  );
  return (
    <div className={styles.MdiskInfo}>
      {!isLoading && (
        <div className={styles.MdiskInfoads}>
          {paginateArr.map((el, index) => (
            <ins
              className='adsbyexoclick'
              data-zoneid={el}
              key={`ad-${el}`}
            ></ins>
          ))}
        </div>
      )}
    </div>
  );
}
