import { Avatar } from "@mui/material";
import moment from "moment";
import { IVideoDetails } from "../../../redux/types/videoDetailsTypes";
import { formatNumToThousands } from "../../../utils/dateHelpers";
import "./VideoDetails.scss";
import Linkify from "react-linkify";
import Button from "../../../components/Button/Button";
import { useState } from "react";

export default function VideoDetails({ id, title, channelId, channelTitle, description, publishedAt, tags, thumbnails, statistics }: IVideoDetails) {
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(false);

  const handleClick = () => {
    setShouldShowMore((previousState) => !previousState);
  };

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
        <div style={{ position: "relative", width: "100%", backgroundColor: "#edeaea" }}>
          <Linkify
            componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
              <a href={decoratedHref} key={key} target="_blank" rel="noreferrer">
                {decoratedText}
              </a>
            )}
          >
            <p className={`VideoDetails__desc-text ${shouldShowMore && "VideoDetails__desc-text-expanded"}`}>{description}</p>
          </Linkify>

          <Button
            onClick={handleClick}
            text="Show more"
            color="inherit"
            className={`${shouldShowMore ? "VideoDetails__desc-btn-bottom" : "VideoDetails__desc-btn"}`}
          />
        </div>

        {/* <span className="VideoDetails__desc-tags">{tags?.map((tag) => `#${tag}`)}</span> */}
      </div>
    </div>
  );
}
