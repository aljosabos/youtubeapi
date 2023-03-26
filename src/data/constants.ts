const INITIAL_LOAD_SIZE_PARAM = "&maxResults=16";
const LOAD_MORE_SIZE_PARAM = "&maxResults=4";

/* endpoints */

const GET_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

export const GET_INITIAL_VIDEOS_URL = `${GET_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;

export const GET_MORE_VIDEOS_URL = `${GET_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}`;

export const AUTH_SCOPE =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.third-party-link.creator";
