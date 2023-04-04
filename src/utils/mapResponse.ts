import { formatISOtoHumanReadable, formatNumToThousands } from "./dateHelpers";
import moment from "moment";
import { IRelatedVideosResponse, IVideoResponse } from "../types/response";

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

export const mapResponseToRelatedVideoIDs = (
  response: IRelatedVideosResponse[]
) => response.map((item: IRelatedVideosResponse) => item.id.videoId);

// "items": [
//   {
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "mTHcRufPfRw"
//     },
//     "snippet": {
//       "title": "Our First Week of Van Life in Mexico"
//     }
//   },
//   {
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "RsYyxrrxlV8"
//     },
//     "snippet": {
//       "title": "We Built a Greenhouse in our Backyard"
//     }
//   }
