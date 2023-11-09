export interface IVideoResponse {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    channelId: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

export interface ISubscriptionsResponse {
  id: string;
  snippet: {
    title: string;
    resourceId: {
      channelId: string;
    };
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

export interface IVideoDetailsResponse {
  snippet: {
    id: string;
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    tags: string[];
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface IChannelInfoResponse {
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
  };
}

export interface ICommentResponse {
  snippet: {
    topLevelComment: {
      snippet: {
        videoId: string;
        textDisplay: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        likeCount: number;
        publishedAt: string;
        updatedAt: string;
      };
    };
  };
}
