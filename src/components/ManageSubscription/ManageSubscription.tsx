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
import SubscribeDialogBox from "../../pages/VideoPlayback/VideoDetails/SubscribeButton/SubscribeDialogBox/SubscribeDialogBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface IManageSubscriptionProps {
  channelId: string;
  channelTitle: string;
}

export default function ManageSubscription({ channelId, channelTitle }: IManageSubscriptionProps) {
  const dispatch = useAppDispatch();
  const { login, isLoggedIn } = useLogin();
  const { isSubscribed, idToUnsubscribe } = useSubscribe(channelId);

  const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectBtnValue, setSelectBtnValue] = useState<string>("");
  const [endIcon, setEndIcon] = useState<MaterialIcon>();

  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const [isDialogBoxClicked, setIsDialogBoxClicked] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderEndIcon = () => {
    if (!isSubscribed || !isLoggedIn) return;
    return showOptions ? ExpandLessIcon : ExpandMoreIcon;
  };

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : undefined,
    endIcon: renderEndIcon(),
  };

  const btnRef = useRef<HTMLDivElement>(null);
  const subscribeBtnWrapperRef = useRef<HTMLDivElement>(null);

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectBtnValue("");
  };

  const handleUnsubscribeFromChannel = () => {
    if (idToUnsubscribe) {
      dispatch(unsubscribeFromChannelThunk(idToUnsubscribe));
      handleModalClose();
    }
  };

  const handleOnBtnClick = () => {
    if (!isLoggedIn) {
      return setShowDialogBox((prevState) => !prevState);
    } else {
      if (!isSubscribed) {
        return dispatch(subscribeToChannelThunk(channelId));
      }

      setShowOptions((previousState) => !previousState);
    }
  };

  const onDialogBoxClick = () => {
    login();
    setIsDialogBoxClicked(true);
  };

  const handleSubscribeBtnOptionChange = (e: React.MouseEvent<HTMLLIElement>) => {
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
        onClick={handleOnBtnClick}
        onChangeOption={handleSubscribeBtnOptionChange}
        startIcon={btnConfig.startIcon}
        endIcon={btnConfig.endIcon}
        btnRef={btnRef}
        className="ManageSubscription__btn"
      />
      {showDialogBox && !isLoggedIn && <SubscribeDialogBox onClick={onDialogBoxClick} />}

      <ModalPortal>
        <ConfirmationModal open={openModal} closeModal={handleModalClose} onConfirm={handleUnsubscribeFromChannel} title={channelTitle} />
      </ModalPortal>
    </div>
  );
}
