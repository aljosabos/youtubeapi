import { Avatar } from "@mui/material";
import moment from "moment";
import { IVideoDetails } from "../../../redux/types/videoDetailsState";
import { formatNumToThousands } from "../../../utils/dateUtils";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";

export default function VideoDetails({ id, title, channelId, channelTitle, description, publishedAt, tags, thumbnails, statistics }: IVideoDetails) {
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(false);

  const btnText = shouldShowMore ? "Show less" : "Show more";
  const addBtnClass = (className: string) => (shouldShowMore ? `${className}-bottom` : className);

  const addDescriptionTextClass = (className: string) => (shouldShowMore ? `${className}-expanded` : className);

  const handleClick = () => {
    setShouldShowMore((previousState) => !previousState);
  };

  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel">
        {<Avatar src={thumbnails?.high?.url} className="VideoDetails__channel-avatar" alt="Subscriptions avatar" />}

        <div className="VideoDetails__channel-info">
          <h4 className="VideoDetails__channel-info-name">{channelTitle}</h4>
          <span className="VideoDetails__channel-info-subscribers">20K subscribers</span>
        </div>
      </div>

      <div className="VideoDetails__description">
        <div className="VideoDetails__description-heading">
          <span className="VideoDetails__description-heading-views">{formatNumToThousands(Number(statistics?.viewCount))}K views</span>
          <span className="VideoDetails__description-heading-time">{moment(publishedAt).fromNow()}</span>

          <Button onClick={handleClick} text={btnText} color="info" className={addBtnClass("VideoDetails__description-btn")} variant="outlined" />
        </div>

        <LinkifyText>
          <p className={addDescriptionTextClass("VideoDetails__description-text")}>{description}</p>
        </LinkifyText>

        {/* <span className="VideoDetails__desc-tags">{tags?.map((tag) => `#${tag}`)}</span> */}
      </div>
      <span>{statistics?.commentCount} Comments</span>
    </div>
  );
}
