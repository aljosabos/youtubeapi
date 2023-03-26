import { formatISOtoHumanReadable, formatNumToThousands } from "./dateHelpers";
import moment from "moment";
import { IVideoResponse } from "../types/response";

export const mapResponseToVideos = (items: IVideoResponse[]) =>
  items.map((item: IVideoResponse) => ({
    id: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    image: item.snippet.thumbnails.high.url,
    duration: formatISOtoHumanReadable(item.contentDetails.duration),
    views: formatNumToThousands(Number(item.statistics.viewCount)),
    publishDate: moment(item.snippet.publishedAt).fromNow(),
  }));