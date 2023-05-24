import { useEffect, useRef, useState } from "react";
import "./ManageSubscription.scss";
import { MaterialIcon } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useLogin } from "../../hooks/useLogin";
import { useSubscribe } from "../../hooks/useSubscribe";
import SelectButton from "../SelectButton/SelectButton";
import { ModalPortal } from "../../utils/ModalPortal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { subscribeToChannelThunk, unsubscribeFromChannelThunk } from "../../redux/thunks/subscriptionsThunk";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LoginDialogBox from "../LoginDialogBox/LoginDialogBox";
import { useTranslation } from "react-i18next";

interface IManageSubscriptionProps {
  channelId: string;
  channelTitle: string;
}

export default function ManageSubscription({ channelId, channelTitle }: IManageSubscriptionProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useLogin();
  const { t } = useTranslation();
  const { isSubscribed, idToUnsubscribe } = useSubscribe(channelId);

  const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectBtnValue, setSelectBtnValue] = useState<string>("");

  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const [isDialogBoxClicked, setIsDialogBoxClicked] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderEndIcon = () => {
    if (!isSubscribed || !isLoggedIn) return;
    return showOptions ? ExpandLessIcon : ExpandMoreIcon;
  };

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : "",
    endIcon: renderEndIcon(),
  };

  const btnRef = useRef<HTMLDivElement>(null);
  const subscribeBtnWrapperRef = useRef<HTMLDivElement>(null);

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectBtnValue("");
  };

  const handleOnConfirm = () => {
    if (idToUnsubscribe) {
      dispatch(unsubscribeFromChannelThunk(idToUnsubscribe));
      handleModalClose();
    }
  };

  const subscribeToChannel = (channelId: string) => {
    dispatch(subscribeToChannelThunk(channelId));
  };

  const toggleShowDialogBox = () => setShowDialogBox((prevState) => !prevState);

  const handleBtnClick = () => {
    if (!isLoggedIn) toggleShowDialogBox();
    else {
      if (!isSubscribed) {
        return subscribeToChannel(channelId);
      }
      setShowOptions((previousState) => !previousState);
    }
  };

  const handleBtnOptionChange = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setSelectBtnValue(value);
  };

  useEffect(() => {
    if (selectBtnValue === "unsubscribe") setOpenModal(true);
    setShowOptions(false);
  }, [selectBtnValue]);

  return (
    <div ref={subscribeBtnWrapperRef} className="ManageSubscription">
      <SelectButton
        text={btnConfig.text}
        options={selectOptions}
        showOptions={showOptions}
        onClick={handleBtnClick}
        onChangeOption={handleBtnOptionChange}
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
        <ConfirmationModal open={openModal} closeModal={handleModalClose} onConfirm={handleOnConfirm} title={channelTitle} />
      </ModalPortal>
    </div>
  );
}
