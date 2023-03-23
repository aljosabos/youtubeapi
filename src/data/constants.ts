export const INITIAL_LOAD_SIZE = 16;
export const LOAD_MORE_SIZE = 4;

/* endpoints */

export const INITIAL_LOAD_ENDPOINT = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&maxResults=${INITIAL_LOAD_SIZE}&key=${process.env.REACT_APP_API_KEY}`;
