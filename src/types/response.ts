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
