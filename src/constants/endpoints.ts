export const AUTH_SCOPE =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.third-party-link.creator";

const GET_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

const INITIAL_LOAD_SIZE_PARAM = "&maxResults=16";
const LOAD_MORE_SIZE_PARAM = "&maxResults=4";
export const GET_INITIAL_VIDEOS_URL = `${GET_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;

export const GET_MORE_VIDEOS_URL = `${GET_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}`;

export const GET_SUBSCRIPTIONS_URL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&fields=items(id,snippet(title,channelId,thumbnails(high(url)))),nextPageToken,pageInfo(totalResults)&key=${process.env.REACT_APP_API_KEY}`;

export const GET_VIDEO_DETAILS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&fields=items(id,snippet(channelId,channelTitle,description,publishedAt,tags,title,thumbnails(high(url))))&key=${process.env.REACT_APP_API_KEY}`;
