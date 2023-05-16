import { Avatar } from "@mui/material";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";
import { IVideoDetails } from "../../../types/types";
import { scrollPageToTop } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translateDateToCurrentLanguage } from "../../../utils/date-utils";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SelectButton from "../../../components/SelectButton/SelectButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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

  const [expandSubscriptionOptions, setExpandSubscriptionOptions] = useState<boolean>(false);

  const subscriptionBtnEndIcon = expandSubscriptionOptions ? ExpandLessIcon : ExpandMoreIcon;

  const translatedDate = translateDateToCurrentLanguage(publishedAt);
  const BASE_CLASS = "VideoDetails__description";

  const jsxConfig = {
    expandBtnText: expandVideoDetails ? t("videoDetails.btn.showLess") : t("videoDetails.btn.showMore"),
    expandBtnClass: expandVideoDetails ? `${BASE_CLASS}-btn--bottom` : `${BASE_CLASS}-btn`,
    descriptionClass: expandVideoDetails ? `${BASE_CLASS}-text--expanded` : `${BASE_CLASS}-text`,
  };

  const toggleShowMore = () => {
    if (expandVideoDetails) scrollPageToTop();
    setExpandVideoDetails((previousState) => !previousState);
  };

  const toggleExpandSubscriptionOptions = () => {
    setExpandSubscriptionOptions((previousState) => !previousState);
  };

  const handleSubscriptionBtnOnChange = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log((e.target as HTMLElement).getAttribute("data-value"));
  };

  const handleSubscribe = () => {
    console.log("click");
  };

  const openChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  const selectItems = [
    { name: "item 1", value: "item 1" },
    { name: "item 2", value: "item 2" },
    { name: "item 3", value: "item 3" },
  ];

  return (
    <div className="VideoDetails">
      <h3 className="VideoDetails__title">{title} </h3>

      <div className="VideoDetails__channel">
        {<Avatar src={image} className="VideoDetails__channel-avatar" alt="Subscriptions avatar" />}

        <div className="VideoDetails__channel-info" onClick={() => openChannel(channelId)}>
          <h4 className="VideoDetails__channel-info-name">{channelTitle}</h4>
          <span className="VideoDetails__channel-info-subscribers">20K {t("videoDetails.subscribers")}</span>
        </div>

        <SelectButton
          text="Subscribed"
          items={selectItems}
          expandOptions={expandSubscriptionOptions}
          onClick={toggleExpandSubscriptionOptions}
          onChange={handleSubscriptionBtnOnChange}
          startIcon={NotificationsNoneIcon}
          endIcon={subscriptionBtnEndIcon}
        />
      </div>

      <div className="VideoDetails__description">
        <div className="VideoDetails__description-heading">
          <span className="VideoDetails__description-heading-views">{viewCount}K views</span>
          <span className="VideoDetails__description-heading-time">{translatedDate}</span>

          <Button onClick={toggleShowMore} text={jsxConfig.expandBtnText} color="info" className={jsxConfig.expandBtnClass} variant="outlined" />
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
