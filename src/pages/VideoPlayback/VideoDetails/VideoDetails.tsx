import { Avatar } from "@mui/material";
import "./VideoDetails.scss";
import Button from "../../../components/Button/Button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import LinkifyText from "../../../components/LinkifyText/LinkifyText";
import { IVideoDetails } from "../../../types/types";
import { scrollPageToTop } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translateDateToCurrentLanguage } from "../../../utils/date-utils";
import SubscribeButton from "./SubscribeButton/SubscribeButton";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useSubscribe } from "../../../hooks/useSubscribe";
import { ModalPortal } from "../../../utils/ModalPortal";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { unsubscribeFromChannelThunk } from "../../../redux/thunks/subscriptionsThunk";

interface IVideoDetailsProps extends IVideoDetails {
  shouldExpandDescription: boolean;
  setShouldExpandDescription: Dispatch<SetStateAction<boolean>>;
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
  shouldExpandDescription,
  setShouldExpandDescription,
}: IVideoDetailsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const subscribeBtnRef = useRef<HTMLDivElement>(null);
  const { idToUnsubscribe } = useSubscribe(channelId);

  const [showSubscriptionBtnOptions, setShowSubscriptionBtnOptions] = useState<boolean>(false);
  const [subscriptionBtnValue, setSubscriptionBtnValue] = useState<string>("");
  const [shouldOpenConfirmationModal, setShouldOpenConfirmationModal] = useState<boolean>(false);

  const hideSubscriptionBtnOptions = () => {
    setShowSubscriptionBtnOptions(false);
  };

  useOutsideClick(subscribeBtnRef, hideSubscriptionBtnOptions);

  const translatedDate = translateDateToCurrentLanguage(publishedAt);
  const BASE_CLASS = "VideoDetails__description";

  const jsxConfig = {
    expandBtnText: shouldExpandDescription ? t("videoDetails.btn.showLess") : t("videoDetails.btn.showMore"),
    expandBtnClass: shouldExpandDescription ? `${BASE_CLASS}-btn--bottom` : `${BASE_CLASS}-btn`,
    descriptionClass: shouldExpandDescription ? `${BASE_CLASS}-text--expanded` : `${BASE_CLASS}-text`,
  };

  const toggleExpandDescription = () => {
    if (shouldExpandDescription) scrollPageToTop();
    setShouldExpandDescription((previousState) => !previousState);
  };

  const openChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  const handleSubscribeBtnOptionChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setSubscriptionBtnValue(value);
  };

  const closeModal = () => {
    setShouldOpenConfirmationModal(false);
  };

  const handleUnsubscribeFromChannel = () => {
    if (idToUnsubscribe) {
      dispatch(unsubscribeFromChannelThunk(idToUnsubscribe));
      closeModal();
    }
  };

  useEffect(() => {
    if (subscriptionBtnValue === "unsubscribe") {
      setShouldOpenConfirmationModal(true);
      setShowSubscriptionBtnOptions(false);
      setSubscriptionBtnValue("");
    }
  }, [subscriptionBtnValue]);

  return (
    <>
      <div className="VideoDetails">
        <h3 className="VideoDetails__title">{title} </h3>

        <div className="VideoDetails__channel">
          {<Avatar src={image} className="VideoDetails__channel-avatar" alt="Subscriptions avatar" />}

          <div className="VideoDetails__channel-info" onClick={() => openChannel(channelId)}>
            <h4 className="VideoDetails__channel-info-name">{channelTitle}</h4>
            <span className="VideoDetails__channel-info-subscribers">20K {t("videoDetails.subscribers")}</span>
          </div>

          <SubscribeButton
            btnRef={subscribeBtnRef}
            showSubscriptionBtnOptions={showSubscriptionBtnOptions}
            setShowSubscriptionBtnOptions={setShowSubscriptionBtnOptions}
            channelId={channelId}
            onChangeOption={handleSubscribeBtnOptionChange}
          />
        </div>

        <div className="VideoDetails__description">
          <div className="VideoDetails__description-heading">
            <span className="VideoDetails__description-heading-views">{viewCount}K views</span>
            <span className="VideoDetails__description-heading-time">{translatedDate}</span>

            <Button
              onClick={toggleExpandDescription}
              text={jsxConfig.expandBtnText}
              color="info"
              className={jsxConfig.expandBtnClass}
              variant="outlined"
            />
          </div>

          <LinkifyText>
            <p className={jsxConfig.descriptionClass}>{description}</p>
          </LinkifyText>

          {/* <span className="VideoDetails__desc-tags">{tags?.map((tag) => `#${tag}`)}</span> */}
        </div>
        <span>{commentCount} Comments</span>
      </div>

      <ModalPortal>
        <ConfirmationModal
          open={shouldOpenConfirmationModal}
          closeModal={closeModal}
          onConfirm={handleUnsubscribeFromChannel}
          channel={channelTitle}
        />
      </ModalPortal>
    </>
  );
}
