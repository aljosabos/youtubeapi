export const AUTH_SCOPE =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.third-party-link.creator";

export const VIDEOS_LIST_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

export const POPULAR_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,description, channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

export const SUBSCRIPTIONS_URL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&fields=items(id,snippet(title,channelId,thumbnails(high(url)))),nextPageToken,pageInfo(totalResults)&key=${process.env.REACT_APP_API_KEY}`;

export const VIDEO_DETAILS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&fields=items(id,statistics,snippet(channelId,channelTitle,description,publishedAt,tags,title,thumbnails(high(url))))&key=${process.env.REACT_APP_API_KEY}`;

export const RELATED_VIDEO_IDS_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&fields=items(id,snippet(title))&type=video&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;

export const USER_INFO_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&fields=items(snippet(title,thumbnails(default(url))))&mine=true&key=${process.env.REACT_APP_API_KEY}`;

export const SEARCH_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=cars&&maxResults=50&fields=items(id(videoId,channelId),snippet(publishedAt,title,description,channelTitle,thumbnails(default(url))))&key=${process.env.REACT_APP_API_KEY}`;

export const SEARCH_VIDEO_IDS_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&fields=items(id,snippet(title))&type=video&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;
