export const AUTH_SCOPE =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.third-party-link.creator";

/* LOAD SIZE PARAMETERS */
export const INITIAL_LOAD_SIZE_PARAM = "&maxResults=16";
export const LOAD_MORE_SIZE_PARAM = "&maxResults=4";

export const POPULAR_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

/* SUBSCRIPTION */
export const SUBSCRIPTIONS_URL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&fields=items(id,snippet(title,channelId,thumbnails(high(url)))),nextPageToken,pageInfo(totalResults)&key=${process.env.REACT_APP_API_KEY}`;

/* VIDEO DETAILS */
export const VIDEO_DETAILS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&fields=items(id,statistics,snippet(channelId,channelTitle,description,publishedAt,tags,title,thumbnails(high(url))))&key=${process.env.REACT_APP_API_KEY}`;

/* RELATED VIDEOS */
export const RELATED_VIDEO_IDS_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&fields=items(id,snippet(title))&type=video&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;

export const RELATED_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;
