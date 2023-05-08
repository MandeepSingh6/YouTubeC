export const key0 = "AIzaSyBnrhMpaTJD4hVg5EGyshmrIPcU2PtxDDA";
export const key1 = "AIzaSyCtRJox0MG10bNheT3FoiwmuoieFqO5ZR4";
export const key2 = "AIzaSyAlpRW6SWDDtXEVeWIwos-spK6aAO6K1Yg";
export const key3 = "AIzaSyAlo5Vg7-_YQxXdz-PqWivyhmQtkrb-8L4";
export const key4 = "AIzaSyA2sBjO36X8Zsb9SOeG7FocCUVrlsjQFNM";

export const key5 = "AIzaSyCYHy0j4Iscik6e-vHiD7o6wuhMzTKl1HM";
export const key6 = "AIzaSyBHtPfOKQfR3sKiqCjTZneYxcgF1arXFFQ";
export const key7 = "AIzaSyDxdnqhaVDNNF1O3YliiEruGmOzovR1_j0";
export const key8 = "AIzaSyDf1xHAxu1tlHNbRVIQ19RVaPn80gE9zpM";

const keysArray = [key0, key1, key2, key3, key4, key5, key6, key7, key8];
let num = 0;
console.log(num, "is the number");

export const FETCH_TRENDING_VIDEOS = async () => {
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ca&key=" +
        keysArray[num]
    );
    if (res.ok === false) {
      console.log("Trending fetch failed with number", num);
      num < 8 ? (num += 1) : (num = 0);
    } else {
      console.log("Trending fetch passed with number", num);
      const data = await res.json();
      return data.items;
    }
  }
};

export const FETCH_SEARCH_RESULTS = async (query) => {
  console.log("num is", num);
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=25&q=${query}&key=${keysArray[num]}`
    );
    if (res.ok === false) {
      console.log("Search fetch failed with number", num);
      num < 8 ? (num += 1) : (num = 0);
    } else {
      console.log("Search fetch passed with number", num);
      const data = await res.json();
      return data.items;
    }
  }
};

export const FETCH_CHANNEL_DETAILS = async (channelId) => {
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${keysArray[num]}`
    );
    if (res.ok === false) {
      console.log("Channel fetch failed with number", num);
      num < 8 ? (num += 1) : (num = 0);
    } else {
      console.log("Channel fetch passed with number", num);
      const data = await res.json();
      return data.items[0];
    }
  }
};

export const FETCH_VIDEO_DATA = async (link) => {
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${link}&key=${keysArray[num]}`
    );
    if (res.ok === false) {
      console.log("Video fetch failed with number", num);
      num < 8 ? (num += 1) : (num = 0);
    } else {
      console.log("Video fetch passed with number", num);
      const data = await res.json();
      return data.items[0];
    }
  }
};

export const FETCH_RELATED_VIDEOS = async (videoId) => {
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${keysArray[num]}`
    );
    if (res.ok === false) {
      console.log("Related fetch failed with number", num);
      num < 8 ? (num += 1) : (num = 0);
    } else {
      console.log("Related fetch passed with number", num);
      const data = await res.json();
      return data.items;
    }
  }
};

export const FETCH_VIDEO_COMMENTS = async (videoId) => {
  let stop = false;
  let res;
  while (!stop) {
    res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=40&videoId=${videoId}&key=${keysArray[num]}`
    );
    if (res.ok === false) {
      num < 8 ? (num += 1) : (num = 0);
      console.log("Comments fetch failed with number", num);
    } else {
      console.log("Comments fetch passed with number", num);
      const data = await res.json();
      return data.items;
    }
  }
};
