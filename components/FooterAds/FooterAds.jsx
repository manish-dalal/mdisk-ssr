import React, { useEffect, useState, useRef } from 'react';

import { getMobileOS } from '../../utils/get-mobile-os';
import { ads as exoClickAds } from './exoClickAds';
import styles from './FooterAds.module.css';
import { iHostname, isBrowser } from '../../utils';

const adPageSize = 6;
const loadCount = getMobileOS() === 'Android' ? 1000 : 6;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const getExoAdsArr = () => {
  const hostname = isBrowser ? window.location.hostname : iHostname[1];
  let exoAdsArr = exoClickAds.new[hostname];
  if (!(exoAdsArr && exoAdsArr.length)) {
    exoAdsArr = exoClickAds.old[iHostname[1]];
  }
  return shuffle(exoAdsArr);
};

export default function MdiskInfo({ isLoading }) {
  const exoAdsArr = getExoAdsArr();
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

      // Native Banner
      // var jsElm2 = document.createElement('script');
      // jsElm2['data-cfasync'] = false;
      // jsElm2.async = true;
      // jsElm2.type = 'text/javascript';
      // jsElm2.src = `https://mineraltip.com/${adseraId}/invoke.js`;
      // document.head.appendChild(jsElm2);

      // Social Bar (like dialog)
      // var jsElm3 = document.createElement('script');
      // jsElm3.type = 'text/javascript';
      // jsElm3.src =
      //   'https://mineraltip.com/c0/ad/0a/c0ad0a9f4384a13bad50f3d0c3da2235.js';
      // document.head.appendChild(jsElm3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
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
