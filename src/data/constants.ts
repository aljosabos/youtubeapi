const INITIAL_LOAD_SIZE_PARAM = "&maxResults=16";
const LOAD_MORE_SIZE_PARAM = "&maxResults=4";

/* endpoints */

const GET_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

export const GET_INITIAL_VIDEOS_URL = `${GET_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;

export const GET_MORE_VIDEOS_URL = `${GET_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}`;
