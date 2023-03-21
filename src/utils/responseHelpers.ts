import { IVideoResponse } from "./../types/response";

export const mapResponseToVideos = (video: IVideoResponse) => {
  return {
    id: video.id,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    image: video.snippet.thumbnails.high.url,
  };
};
