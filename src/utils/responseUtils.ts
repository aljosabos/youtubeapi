import {
  formatISOtoHumanReadable,
  formatToThousandsWithOneDecimal,
} from "./dateUtils";
import moment from "moment";
import {
  IRelatedVideosResponse,
  IVideoDetailsResponse,
  IVideoResponse,
} from "../types/response";

export const mapResponseToVideos = (items: IVideoResponse[]) =>
  items.map((item: IVideoResponse) => ({
    id: item.id,
    title: item.snippet?.title,
    channel: item.snippet?.channelTitle,
    image: item.snippet?.thumbnails.high.url,
    duration: formatISOtoHumanReadable(item.contentDetails?.duration),
    views: formatToThousandsWithOneDecimal(Number(item.statistics?.viewCount)),
    publishDate: moment(item.snippet?.publishedAt).fromNow(),
  }));

export const mapResponseToRelatedVideoIDs = (
  response: IRelatedVideosResponse[]
) => response.map((item: IRelatedVideosResponse) => item.id.videoId);

export const formatResponseToVideoDetails = (
  response: IVideoDetailsResponse
) => ({
  id: response?.snippet?.id,
  title: response?.snippet?.title,
  channelId: response?.snippet?.channelId,
  channelTitle: response?.snippet?.channelTitle,
  description: response?.snippet?.description,
  publishedAt: moment(response?.snippet?.publishedAt).fromNow(),
  tags: response?.snippet?.tags,
  image: response?.snippet?.thumbnails?.high?.url,
  viewCount: formatToThousandsWithOneDecimal(
    Number(response?.statistics?.viewCount)
  ),
  commentCount: response?.statistics?.commentCount,
});
