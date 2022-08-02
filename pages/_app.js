import React from 'react';
import '../styles/globals.css';
import { iHostname } from '../utils';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // let activeId = '';
    const finalHost = window.location.hostname.includes('dood') ? iHostname[0] : iHostname[1];

    let activeTagManagerId = '';
    switch (finalHost) {
      case iHostname[0]:
        // UA-217866237-5
        // activeId = 'G-9LGQVXEFKJ';
        activeTagManagerId = 'GTM-K6X27VN';
        break;
      case iHostname[1]:
        // UA-217866237-4
        // activeId = 'G-6TT11RCXQ7';
        activeTagManagerId = 'GTM-N7V3CV4';
        break;
      default:
        // activeId = 'G-HCDP5N394E';
        activeTagManagerId = 'GTM-PVTZFTG';
        break;
    }

    if (activeTagManagerId) {
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', activeTagManagerId);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
