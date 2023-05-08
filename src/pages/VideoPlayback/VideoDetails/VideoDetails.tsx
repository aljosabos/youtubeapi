import { Avatar } from "@mui/material";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";
import { IVideoDetails } from "../../../types/types";
import { scrollPageToTop } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(false);
  const BASE_CLASS = "VideoDetails__description";

  const jsxConfig = {
    btnText: shouldShowMore ? "Show less" : "Show more",
    btnClass: shouldShowMore ? `${BASE_CLASS}-btn--bottom` : `${BASE_CLASS}-btn`,
    descriptionClass: shouldShowMore ? `${BASE_CLASS}-text--expanded` : `${BASE_CLASS}-text`,
  };

  const handleClick = () => {
    if (shouldShowMore) scrollPageToTop();
    setShouldShowMore((previousState) => !previousState);
  };

  const openChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel" onClick={() => openChannel(channelId)}>
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
