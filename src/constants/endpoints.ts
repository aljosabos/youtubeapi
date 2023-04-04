export const AUTH_SCOPE =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.third-party-link.creator";

/* LOAD SIZE PARAMETERS */
export const INITIAL_LOAD_SIZE_PARAM = "&maxResults=16";
export const LOAD_MORE_SIZE_PARAM = "&maxResults=4";

export const POPULAR_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

// 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=shW9i6k8cB0%2CmO0OuR26IZM%2CPg9XSSeQIOc%2C1WEAJ-DFkHE%2CjRtLcPTbrxo%2C6umxqVvVK8Y%2CUqzKzugvtR0%2CCTXtXxD-TYg%2CTpLh9vB02MM%2Cz7n3SKwRaPA%2CFOvXEp-22f0%2C_ajQow29I7U%2CWKLD9QEx9ks%2C58Ofg9IHRN0%2CSZQhgExjBvQ%2CuGm4VIt14tU%2CvS3_72Gb-bI%2CZX3dJ_QVD0I%2CgvDWYQhYzhY%2CwgY9iO-fji8%2C5glbmwhyP-s%2CmmBl8Iz8OkE%2CLfaG3rGk3qE%2CJcl-Z9Lb8Hg%2CUJsGEZLYpKE%2CvVG3v8mCK1s%2Cr5x_Xog8fBQ%2C2elO1GEpVy0%2CjVXwCSjoVkI%2CHncXcsw5lZI%2C-4Tzalk090Y%2CJ5QeOa4pmBk%2C0bwD2PofI7I%2CVK_8nDq1A50%2CuV2y_co7WgY%2Cgw7gyYgewcc%2Cc27ZUhymHS8%2C3U467XfT6cY%2CxjIcsrj_PZ0%2CQSfVN4kD9c4%2CAkrht_QNNKs%2COSUGX3Ql4Ys%2CG8R4CbW4Jj0%2CvRYMf50sHPA%2CKPz1r8DCuH0%2CLxdvV0rLr7Y%2CSuGyZEuPKyI%2CcOOr33GnugY%2CKs1RBvvqlss&key=[YOUR_API_KEY]' \

/* SUBSCRIPTION */
export const SUBSCRIPTIONS_URL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&fields=items(id,snippet(title,channelId,thumbnails(high(url)))),nextPageToken,pageInfo(totalResults)&key=${process.env.REACT_APP_API_KEY}`;

/* VIDEO DETAILS */
export const VIDEO_DETAILS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&fields=items(id,statistics,snippet(channelId,channelTitle,description,publishedAt,tags,title,thumbnails(high(url))))&key=${process.env.REACT_APP_API_KEY}`;

/* RELATED VIDEOS */
export const RELATED_VIDEO_IDS_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&fields=items(id,snippet(title))&type=video&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;

export const RELATED_VIDEOS_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&key=${process.env.REACT_APP_API_KEY}`;
