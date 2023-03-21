export interface IThumbnailResponse {
  url: string;
  height: number;
  width: number;
}

export interface IVideoResponse extends IThumbnailResponse {
  id: string;
  snippet: {
    title: string;
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };

    publishedAt: string;
    tags: string[];

    thumbnails: {
      default: IThumbnailResponse;
      high: IThumbnailResponse;
      maxres: IThumbnailResponse;
      medium: IThumbnailResponse;
      standard: IThumbnailResponse;
    };
  };
}

export interface IVideoMappedResponse {
  id: string;
  title: string;
  channel: string;
  image: string;
}
