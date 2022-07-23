export const getHost = (context) => context.req.headers.host || null;
export const getOrigin = (context) => context.req.headers.origin || null;
export const hostname =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : '';
export const origin =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';
export const iHostname = ['dood.eu.org', 'mdisk.eu.org'];

export const isBrowser = typeof window !== 'undefined';

export const videoSize = (sizeArg) => {
  let size = null;
  let s = sizeArg;
  let map = ['B', 'KB', 'M', 'G'];
  let count = 0;
  while (s > 1024) {
    s /= 1024;
    count++;
  }
  size = s.toFixed(1) + map[count];
  return size;
};

export const config = {
  hostname,
  origin,
};
