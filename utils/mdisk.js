import { pushToDataLayer } from './google-analytics';

const isBrowser = typeof window !== 'undefined';
const navigator = isBrowser && window.navigator;
const isBuggyChrome = () => {
  if (!isBrowser) return false;
  const chromeVersionMatch = navigator?.appVersion?.match(
    /Chrome\/((?:\d+\.?)+)/
  );
  const chromeVersion = chromeVersionMatch && chromeVersionMatch[1];
  const chromeVersionSegs = chromeVersion && chromeVersion.split('.');
  return parseInt(chromeVersionSegs[0]) >= 95;
};

function judgeClient() {
  if (!isBrowser) return '';
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u?.indexOf('Adr') > -1;
  // const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return 'Android';
  } else {
    return 'IOS';
  }
}

export const isPC =
  isBrowser &&
  !(
    /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ||
    window.localStorage.getItem('usingMobile')
  );
export const isIOS = judgeClient() === 'IOS';

function isStreamingUrl(link) {
  let url = new URL(link);
  return url.pathname.endsWith('.m3u8') || url.pathname.endsWith('.mpd');
}

function isDeeplinkUrl(link) {
  let url = new URL(link);
  return url.protocol.startsWith('mxplay');
}

export const transformMdiskGet = (data, videoId) => {
  let streamingUrl = data.source;
  let downloadUrl = data.download;
  let playUrl = downloadUrl;
  if (!playUrl) {
    playUrl = streamingUrl;
  }

  let domainMatches = playUrl?.match(/(?:https|mxplay|mxplayer)?:\/\/([^/]*)/);
  let domain = domainMatches?.length && domainMatches[1];

  let useOnlinePlayer = isStreamingUrl(playUrl);
  let useOnlineDownloader = isStreamingUrl(downloadUrl);

  let isDeeplink = isDeeplinkUrl(playUrl);

  let owner = data.display_name || '';
  if (owner.length <= 4) {
    owner = owner.substring(0, Math.floor(owner.length / 2)) + '***';
  } else {
    owner =
      owner.substring(0, 2) +
      '***' +
      owner.substring(owner.length - 2, owner.length);
  }

  let poster = data.poster || '';

  let filename = data.filename || 'untitled';
  // if (/k[_.]?g[_.]?f\s*(chapter)?\s*2?/i.test(filename)) {
  //   throw new Error('content blocked by copyright issue')
  // }

  filename = filename.replace(/#/g, '');
  filename = filename.replace(
    /ass|anal|adult|blow|boob|booty|bhosadi|bdsm|cock|c0ck|chinal|chod|choochii|choot|chudai|chutiya|condom|cum|cunt|cumshots|cowgirl|chutmarike|dick|dildo|doggy\s*st(i|y)le|desi|doodh|deepthroat|ejackulate|ejaculate|f\*ck|faggot|fcuk|fisting|fuck|fudi|fingering|g\s*spot|ga*nd|genitalia|ghanta|gissum|gangbang|gfpd|haramzad|hijde|horny|hand\s*job|hot|kameenay|kanjri|katua|khota|khotey|kutiya|kutt(a|e|i)|klpd|lannd|lauda|lavda|loda|lodu|love\s*making|lund|lingerie|maachod|maachudi|madarchod|make(ing)?\s*love|mardana\s*kamzori|masturbate|mumme|muttha|morning\s*wood|naked|nipple|nude|nudity|orgasm|orgi|orgy|oral|pen+is|pennis|private\s*part|prostitut?|pussy|panties|penetration|pubic\s*hair|quickie|quiky|r\*pe|ra+ndi?|randva|rape|raping|reverse\s*cowgirl|\$ex|saala|se?x|strip|slut|seduce|threesome|tits|teen|ul?l(u|oo)|vagina|virginity|virgin|vibrator|whore|18+|badwap|beeg|bfxxx|brazzer|erotic|sax|sxe|tube|vidmate|xvideos?|xxx|xnxx?|xvedio/gi,
    '***'
  );

  let video = {
    id: data.rid || '',
    type: 'raw_mp4',
    owner,
    name: filename,
    src: playUrl,
    downloadUrl,
    streamingUrl,
    playDomain: domain,
    fromUser: data.from || '',
    userSrc: data.source_type || '',
    duration: data.duration || 0,
    poster,
    isDeeplink,
    useOnlinePlayer,
    useOnlineDownloader,
    size: data.size || 0,
    width: data.width || 0,
    height: data.height || 0,
    publishTime: data.ts || 0,
    ad_action: data.ad_action || 0,
    videoId,
    useSimplePlayerOnly: parseInt(data.duration || 0) < 2 * 60,
  };
  return video;
};

let globlethis = {};
function trackInfo(video) {
  let info = {
    fromuser: video.fromUser,
    video: video.id,
    source: video.userSrc,
    duration: video.duration,
    domain: video.playDomain,
  };
  return encodeURIComponent(JSON.stringify(info));
}
function trackInfoSP(video) {
  let info = {
    fromuser: video.fromUser,
    video: video.id,
    source: video.userSrc,
    duration: video.duration,
    domain: video.playDomain,
    ad_action: video.ad_action,
  };
  return encodeURIComponent(JSON.stringify(info));
}
function mxGooglePlayUrl() {
  return 'intent:market://details?id=com.mxtech.videoplayer.ad&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end';
}

function simpleGooglePlayUrl() {
  return 'intent:market://details?id=com.young.simple.player&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end';
}

// function mxGooglePlayLiveUrl() {
//   return 'intent:market://details?id=com.mxtech.videoplayer.ad&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dsplive#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end';
// }

function splayerAppStoreUrl() {
  return 'https://apps.apple.com/app/splayer-all-video-player/id1616607575';
}

function openApp(href, googlePlayUrl) {
  if (isPC) {
    // this.navigateModalOpen = true;
    return;
  }
  globlethis.nowTimeStr = Date.now();

  if (isBrowser && href) {
    window.location.href = href;
  }

  if (globlethis.timeHandle) {
    clearTimeout(globlethis.timeHandle);
    globlethis.timeHandle = null;
  }

  globlethis.timeHandle = setTimeout(() => {
    globlethis.timeHandle = null;
    if (isBrowser && googlePlayUrl) {
      window.location.href = googlePlayUrl;
    }
  }, 4000);
}

export function onPlay(clickEvent, videoData) {
  pushToDataLayer({ event: 'play_1', id: videoData.videoId });

  if (isIOS) {
    let playUrl = `splayer://playback?url=${videoData.src}&action=playback`;
    openApp(playUrl, splayerAppStoreUrl());
    return;
  }

  if (videoData.isDeeplink) {
    let url = new URL(videoData.src);
    url.searchParams.append('utm_medium', videoData.fromUser);
    url.searchParams.append('utm_campaign', videoData.id);
    openApp(url.toString(), mxGooglePlayUrl());
    return;
  }

  let intent = `intent:${videoData.src}#Intent;package=com.mxtech.videoplayer.ad;`;
  if (isBuggyChrome()) {
    intent = `intent:${videoData.src}#Intent;action=com.mxtech.videoplayer.ad.playback_local;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
  }
  if (videoData.useOnlinePlayer) {
    intent = `intent:${videoData.src}#Intent;action=com.mxtech.videoplayer.ad.playback_online;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
  }

  let arr = [intent];
  arr.push('b.decode_mode=2;');
  arr.push(`S.mx_stream_url=${encodeURIComponent(videoData.streamingUrl)};`);
  arr.push(`S.download_url=${encodeURIComponent(videoData.downloadUrl)};`);

  videoData.id && arr.push(`S.id=${videoData.id};`);
  videoData.name && arr.push(`S.title=${encodeURIComponent(videoData.name)};`);
  videoData.size && arr.push(`l.total_size=${videoData.size};`);
  videoData.fromUser && arr.push(`S.tr_parameter=${trackInfo(videoData)};`);

  arr.push('end');
  let url = arr.join('');

  openApp(url, mxGooglePlayUrl());
}

export function convertToMMSS(seconds = 0) {
  seconds = Math.floor(seconds);
  let hours = Math.floor(seconds / 3600);
  let leftSeconds = Math.floor(seconds % 3600);
  let mins = Math.floor(leftSeconds / 60);
  let secs = Math.floor(leftSeconds % 60);

  let res = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  if (hours > 0) {
    res = `${hours < 10 ? '0' + hours : hours}:${res}`;
  }

  return res;
}

export function onSimplePlay(clickEvent, videoData) {
  pushToDataLayer({ event: 'play_2', id: videoData.videoId });
  let intent = `intent:${videoData.src}#Intent;action=com.young.simple.player.playback_online;package=com.young.simple.player;`;

  let arr = [intent];
  arr.push('b.decode_mode=2;');
  arr.push(`S.mx_stream_url=${encodeURIComponent(videoData.streamingUrl)};`);
  arr.push(`S.download_url=${encodeURIComponent(videoData.downloadUrl)};`);

  videoData.id && arr.push(`S.id=${videoData.id};`);
  videoData.name && arr.push(`S.title=${encodeURIComponent(videoData.name)};`);
  videoData.size && arr.push(`l.total_size=${videoData.size};`);
  videoData.fromUser && arr.push(`S.tr_parameter=${trackInfoSP(videoData)};`);

  arr.push('end');
  let url = arr.join('');
  openApp(url, simpleGooglePlayUrl());
}

export function onDownload(videoData) {
  pushToDataLayer({ event: 'download_1', id: videoData.videoId });

  if (isIOS) {
    let downloadUrl = `splayer://playback?url=${videoData.downloadUrl}&action=download`;
    openApp(downloadUrl, splayerAppStoreUrl());
    return;
  }

  if (videoData.isDeeplink) {
    let url = new URL(videoData.src);
    url.searchParams.append('utm_medium', videoData.fromUser);
    url.searchParams.append('utm_campaign', videoData.id);
    openApp(url.toString(), mxGooglePlayUrl());
    return;
  }

  let intent = `intent:${videoData.downloadUrl}#Intent;action=com.mxtech.videoplayer.ad.download;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
  if (videoData.useOnlineDownloader) {
    intent = `intent:${videoData.downloadUrl}#Intent;action=com.mxtech.videoplayer.ad.download_stream;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
  }
  let arr = [intent];
  arr.push('b.decode_mode=2;');

  videoData.id && arr.push(`S.id=${videoData.id};`);
  videoData.name && arr.push(`S.title=${encodeURIComponent(videoData.name)};`);
  videoData.size && arr.push(`l.total_size=${videoData.size};`);
  videoData.poster &&
    arr.push(`S.thumbnail=${encodeURIComponent(videoData.poster)};`);
  videoData.fromUser && arr.push(`S.tr_parameter=${trackInfo(videoData)};`);
  arr.push('end');
  let url = arr.join('');

  openApp(url, mxGooglePlayUrl());
}

export function onSimpleDownload(videoData) {
  // if (!this.downloadable) {
  //   return;
  // }
  pushToDataLayer({ event: 'download_2', id: videoData.videoId });

  let intent = `intent:${videoData.downloadUrl}#Intent;action=com.young.simple.player.download;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.young.simple.player;`;
  let arr = [intent];
  arr.push('b.decode_mode=2;');

  videoData.id && arr.push(`S.id=${videoData.id};`);
  videoData.name && arr.push(`S.title=${encodeURIComponent(videoData.name)};`);
  videoData.size && arr.push(`l.total_size=${videoData.size};`);
  videoData.poster &&
    arr.push(`S.thumbnail=${encodeURIComponent(videoData.poster)};`);
  videoData.fromUser && arr.push(`S.tr_parameter=${trackInfo(videoData)};`);
  arr.push('end');
  let url = arr.join('');

  openApp(url, simpleGooglePlayUrl());
}
