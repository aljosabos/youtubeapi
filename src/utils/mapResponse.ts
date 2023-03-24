import { IVideoResponse } from "../types/response";
import { formatISOtoHumanReadable, formatNumToThousands } from "./dateHelpers";
import moment from "moment";

export const mapResponseToVideo = (response: IVideoResponse) => ({
  id: response.id,
  title: response.snippet.title,
  channel: response.snippet.channelTitle,
  image: response.snippet.thumbnails.high.url,
  duration: formatISOtoHumanReadable(response.contentDetails.duration),
  views: formatNumToThousands(Number(response.statistics.viewCount)),
  publishDate: moment(response.snippet.publishedAt).fromNow(),
});

export const mapResponseToVideos = (response: )
