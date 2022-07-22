const isBrowser = typeof window !== 'undefined';

export const getMobileOS = () => {
  const ua = isBrowser && navigator.userAgent;
  if (/android/i.test(ua)) {
    return 'Android';
  } else if (
    /iPad|iPhone|iPod/.test(ua) ||
    (isBrowser &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1)
  ) {
    return 'iOS';
  } else if (/Mac/.test(ua)) {
    return 'Mac';
  }
  return 'Other';
};
