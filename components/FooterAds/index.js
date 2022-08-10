import FooterAds from './FooterAds';
export default FooterAds;

import { iHostname, isBrowser } from '../../utils';
import { ads as exoClickAds } from './exoClickAds';

const adsType = process.env.ADS_TYPE || 'new';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export const getExoAdsArr = (hostname) => {
  const finalHost = hostname.includes('dood') ? iHostname[0] : iHostname[1];
  let exoAdsArr = exoClickAds[adsType][finalHost];
  // if (!(exoAdsArr && exoAdsArr.length)) {
  //   exoAdsArr = exoClickAds.new[iHostname[1]];
  // }
  return shuffle(exoAdsArr);
};
