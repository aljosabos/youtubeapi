import { Avatar } from "@mui/material";
import moment from "moment";
import { IVideoDetails } from "../../../redux/types/videoDetailsTypes";
import { formatNumToThousands } from "../../../utils/dateHelpers";
import "./VideoDetails.scss";
import Linkify from "react-linkify";

export default function VideoDetails({ id, title, channelId, channelTitle, description, publishedAt, tags, thumbnails, statistics }: IVideoDetails) {
  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel">
        {<Avatar alt="Subscriptions avatar" src={thumbnails?.high?.url} className="VideoDetails__channel-avatar" />}
        <div className="VideoDetails__channel-text">
          <h4 className="VideoDetails__channel-text-name">{channelTitle}</h4>
          <span className="VideoDetails__channel-text-subscribers">20K subscribers</span>
        </div>
      </div>

      <div className="VideoDetails__desc">
        <span className="VideoDetails__desc-views">{formatNumToThousands(Number(statistics?.viewCount))}K views</span>
        <span className="VideoDetails__desc-time">{moment(publishedAt).fromNow()}</span>
        <p className="VideoDetails__desc-text">
          <Linkify
            componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
              <a href={decoratedHref} key={key} target="_blank" rel="noreferrer">
                {decoratedText}
              </a>
            )}
          >
            {description}
          </Linkify>
          ;
        </p>

        <span className="VideoDetails__desc-tags">{tags}</span>
      </div>
    </div>
  );
}
