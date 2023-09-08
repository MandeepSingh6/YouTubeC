export const FETCH_TRENDING_VIDEOS = async () => {
  const res = await fetch(
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ca&key=" +
      key
  );
  const data = await res.json();
  return data.items;
};

export const FETCH_SEARCH_RESULTS = async (query) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=20&q=${query}&key=${key}`
  );
  const data = await res.json();
  return data.items;
};

export const FETCH_CHANNEL_DETAILS = async (channelId) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${channelId}&key=${key}`
  );
  const data = await res.json();
  return data.items[0];
};

export const FETCH_VIDEO_DATA = async (link) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${link}&key=${key}`
  );
  const data = await res.json();
  return data.items[0];
};

export const FETCH_RELATED_VIDEOS = async (videoId) => {
  const resOld = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=30&type=video&key=${key}`
  );
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${videoId}&key=${key}`
  );
  const data = await res.json();
  return data.items;
};

export const FETCH_VIDEO_COMMENTS = async (videoId) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=35&videoId=${videoId}&key=${key}`
  );
  const data = await res.json();
  return data.items;
};

export const FETCH_CHANNEL_VIDEOS = async (channelId) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=48
    `
  );
  const data = await res.json();
  return data.items;
};

export const FETCH_THUMBNAIL_IMAGE = async (videoId) => {
  const res = await fetch(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  );
  if (res.ok === false) {
    return false;
  }
  return res.url;
};
