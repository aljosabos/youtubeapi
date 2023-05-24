import { useEffect, useRef, useState } from "react";
import "./ManageSubscription.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useLogin } from "../../hooks/useLogin";
import { useSubscribe } from "../../hooks/useSubscribe";
import SelectButton from "../SelectButton/SelectButton";
import { ModalPortal } from "../../utils/ModalPortal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { subscribeToChannelThunk, unsubscribeFromChannelThunk } from "../../redux/thunks/subscriptionsThunk";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LoginDialogBox from "../LoginDialogBox/LoginDialogBox";
import { useTranslation } from "react-i18next";
import { SELECT_BTN_OPTIONS } from "../../constants/constants";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IManageSubscriptionProps {
  channelId: string;
  channelTitle: string;
}

export default function ManageSubscription({ channelId, channelTitle }: IManageSubscriptionProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useLogin();
  const { t } = useTranslation();
  const { isSubscribed, idToUnsubscribe } = useSubscribe(channelId);

  const btnRef = useRef<HTMLDivElement>(null);
  const manageSubscriptionWrapperRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectBtnValue, setSelectBtnValue] = useState<string>("");
  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectBtnValue === "unsubscribe") setOpenModal(true);
    setShowOptions(false);
  }, [selectBtnValue]);

  const closeDialogBox = () => {
    setShowDialogBox(false);
  };

  useOutsideClick(manageSubscriptionWrapperRef, closeDialogBox);

  const renderEndIcon = () => {
    if (!isSubscribed || !isLoggedIn) return;
    return showOptions ? ExpandLessIcon : ExpandMoreIcon;
  };

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : "",
    endIcon: renderEndIcon(),
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectBtnValue("");
  };

  const handleOnModalConfirm = () => {
    if (idToUnsubscribe) {
      dispatch(unsubscribeFromChannelThunk(idToUnsubscribe));
      handleModalClose();
    }
  };

  const subscribeToChannel = (channelId: string) => {
    dispatch(subscribeToChannelThunk(channelId));
  };

  const toggleShowLoginDialogBox = () => setShowDialogBox((prevState) => !prevState);

  const handleBtnClick = () => {
    if (!isLoggedIn) toggleShowLoginDialogBox();
    else {
      if (!isSubscribed) {
        return subscribeToChannel(channelId);
      }
      setShowOptions((previousState) => !previousState);
    }
  };

  const handleOptionChange = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setSelectBtnValue(value);
  };

  return (
    <div ref={manageSubscriptionWrapperRef} className="ManageSubscription">
      <SelectButton
        text={btnConfig.text}
        options={SELECT_BTN_OPTIONS}
        showOptions={showOptions}
        onClick={handleBtnClick}
        onChange={handleOptionChange}
        startIcon={btnConfig.startIcon}
        endIcon={btnConfig.endIcon}
        btnRef={btnRef}
        className="ManageSubscription__btn"
      />
      {showDialogBox && !isLoggedIn && (
        <LoginDialogBox
          title={t("dialogBox.subscribe.title")}
          text={t("dialogBox.subscribe.text")}
          className="ManageSubscription__dialogBox"
          alignItems="start"
          callback={() => subscribeToChannel(channelId)}
        />
      )}

      <ModalPortal>
        <ConfirmationModal open={openModal} closeModal={handleModalClose} onConfirm={handleOnModalConfirm} title={channelTitle} />
      </ModalPortal>
    </div>
  );
}
