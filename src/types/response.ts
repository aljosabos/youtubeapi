/* VIDEOS */
export interface IVideoResponse {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

export interface IVideo {
  id: string;
  title: string;
  channel: string;
  image: string;
  duration: string;
  views: number;
  publishDate: string;
}

/* SUBSCRIPTION */
export interface ISubscriptionsResponse {
  id: string;
  snippet: {
    channelId: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

export interface IRelatedVideosResponse {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
  };
}
