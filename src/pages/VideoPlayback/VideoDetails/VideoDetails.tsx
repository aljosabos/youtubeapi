import { Avatar } from "@mui/material";
import moment from "moment";
import { IVideoDetails } from "../../../redux/types/videoDetailsTypes";
import { formatNumToThousands } from "../../../utils/dateHelpers";
import "./VideoDetails.scss";

export default function VideoDetails({
  id,
  title,
  channelId,
  channelTitle,
  description,
  publishedAt,
  tags,
  thumbnails: {
    high: { url },
  },
  statistics: { viewCount, likeCount, favoriteCount, commentCount },
}: IVideoDetails) {
  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel-info">
        <Avatar alt="Subscriptions avatar" src={url} className="VideoDetails__channel-info-avatar" />
        <div className="VideoDetails__channel-info-head">
          <h4 className="VideoDetails__channel-info-head-name">{channelTitle}</h4>
          <span className="VideoDetails__channel-info-head-subscribers">20K subscribers</span>
        </div>
      </div>

      <div className="VideoDetails__description">
        <span className="VideoDetails__description-views">{formatNumToThousands(Number(publishedAt))}</span>
        <span className="VideoDetails__description-time">{moment(publishedAt).fromNow()}</span>
        <p className="VideoDetails__description-text">{description}</p>

        <span className="VideoDetails__description-tags">{tags}</span>
      </div>
    </div>
  );
}
