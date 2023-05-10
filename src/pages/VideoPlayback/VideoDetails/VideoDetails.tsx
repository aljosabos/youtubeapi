import { Avatar } from "@mui/material";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { Dispatch, SetStateAction } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";
import { IVideoDetails } from "../../../types/types";
import { scrollPageToTop } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTranslateDate } from "../../../hooks/useTranslateDate";

interface IVideoDetailsProps extends IVideoDetails {
  expandVideoDetails: boolean;
  setExpandVideoDetails: Dispatch<SetStateAction<boolean>>;
}

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
  expandVideoDetails,
  setExpandVideoDetails,
}: IVideoDetailsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { translatedDate } = useTranslateDate(publishedAt);

  const BASE_CLASS = "VideoDetails__description";

  const jsxConfig = {
    btnText: expandVideoDetails ? t("videoDetails.btn.showLess") : t("videoDetails.btn.showMore"),
    btnClass: expandVideoDetails ? `${BASE_CLASS}-btn--bottom` : `${BASE_CLASS}-btn`,
    descriptionClass: expandVideoDetails ? `${BASE_CLASS}-text--expanded` : `${BASE_CLASS}-text`,
  };

  const handleClick = () => {
    if (expandVideoDetails) scrollPageToTop();
    setExpandVideoDetails((previousState) => !previousState);
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
          <span className="VideoDetails__channel-info-subscribers">20K {t("videoDetails.subscribers")}</span>
        </div>
      </div>

      <div className="VideoDetails__description">
        <div className="VideoDetails__description-heading">
          <span className="VideoDetails__description-heading-views">{viewCount}K views</span>
          <span className="VideoDetails__description-heading-time">{translatedDate}</span>

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
