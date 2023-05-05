import {
  formatISOtoHumanReadable,
  formatToThousandsWithOneDecimal,
} from "./dateUtils";
import moment from "moment";
import {
  IChannelInfoResponse,
  IRelatedVideosResponse,
  ISubscriptionsResponse,
  IVideoDetailsResponse,
  IVideoResponse,
} from "../types/response";
import {
  IChannelInfo,
  ISubscription,
  IVideo,
  IVideoDetails,
} from "../types/types";

export const mapResponseToVideos = (items: IVideoResponse[]) =>
  items.map(
    (item: IVideoResponse): IVideo => ({
      id: item.id,
      title: item.snippet?.title,
      description: item.snippet?.description,
      channel: item.snippet?.channelTitle,
      channelId: item.snippet?.channelId,
      image: item.snippet?.thumbnails.high.url,
      duration: formatISOtoHumanReadable(item.contentDetails?.duration),
      views: formatToThousandsWithOneDecimal(
        Number(item.statistics?.viewCount)
      ),
      publishDate: moment(item.snippet?.publishedAt).fromNow(),
    })
  );

export const mapResponseToVideoIDs = (response: IRelatedVideosResponse[]) =>
  response.map((item: IRelatedVideosResponse) => item.id.videoId);

export const formatResponseToVideoDetails = (
  response: IVideoDetailsResponse
): IVideoDetails => ({
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

export const mapResponseToSubscriptions = (
  response: ISubscriptionsResponse[]
): ISubscription[] =>
  response.map((item) => ({
    id: item?.id,
    channelId: item?.snippet?.resourceId.channelId,
    title: item?.snippet?.title,
    image: item?.snippet?.thumbnails?.high?.url,
  }));

export const formatResponseToChannelInfo = (
  response: IChannelInfoResponse
): IChannelInfo => ({
  title: response?.snippet.title,
  customUrl: response?.snippet.customUrl,
  description: response?.snippet.description,
  publishedAt: response?.snippet.publishedAt,
  image: response?.snippet?.thumbnails?.medium.url,
  subscriberCount: Number(response?.statistics.subscriberCount),
  videoCount: Number(response?.statistics?.videoCount),
});
