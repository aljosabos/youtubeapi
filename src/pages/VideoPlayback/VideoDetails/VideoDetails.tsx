import { Avatar } from "@mui/material";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";
import { IVideoDetails } from "../../../types/types";
import { scrollPageToTop } from "../../../utils/utils";

export default function VideoDetails({
  id,
  title,
  channelId,
  channelTitle,
  description,
  publishedAt,
  tags,
  image,
  viewCount,
  commentCount,
}: IVideoDetails) {
  const BASE_CLASS = "VideoDetails__description";
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(false);

  const jsxConfig = {
    btnText: shouldShowMore ? "Show less" : "Show more",
    btnClass: shouldShowMore ? `${BASE_CLASS}-btn--bottom` : `${BASE_CLASS}-btn`,
    descriptionClass: shouldShowMore ? `${BASE_CLASS}-text--expanded` : `${BASE_CLASS}-text`,
  };

  const handleClick = () => {
    if (shouldShowMore) scrollPageToTop();
    setShouldShowMore((previousState) => !previousState);
  };

  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel">
        {<Avatar src={image} className="VideoDetails__channel-avatar" alt="Subscriptions avatar" />}

        <div className="VideoDetails__channel-info">
          <h4 className="VideoDetails__channel-info-name">{channelTitle}</h4>
          <span className="VideoDetails__channel-info-subscribers">20K subscribers</span>
        </div>
      </div>

      <div className="VideoDetails__description">
        <div className="VideoDetails__description-heading">
          <span className="VideoDetails__description-heading-views">{viewCount}K views</span>
          <span className="VideoDetails__description-heading-time">{publishedAt}</span>

          <Button onClick={handleClick} text={jsxConfig.btnText} color="info" className={jsxConfig.btnClass} variant="outlined" />
        </div>

        <LinkifyText>
          <p className={jsxConfig.descriptionClass}>{description}</p>
        </LinkifyText>

        {/* <span className="VideoDetails__desc-tags">{tags?.map((tag) => `#${tag}`)}</span> */}
      </div>
      <span>{commentCount} Comments</span>
    </div>
  );
}
