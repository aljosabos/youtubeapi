import { SerializedError } from "@reduxjs/toolkit";

// export interface IVideoDetails {
//   id: string;
//   title: string;
//   channelId: string;
//   channelTitle: string;
//   description: string;
//   publishedAt: string;
//   tags: string[];
//   thumbnails: {
//     high: {
//       url: string;
//     };
//   };
//   statistics: {
//     viewCount: string;
//     likeCount: string;
//     favoriteCount: string;
//     commentCount: string;
//   };
// }

export interface IVideoDetails {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
  viewCount: number;
  commentCount: string;
}

export interface IVideoDetailsSliceState {
  data: IVideoDetails;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
