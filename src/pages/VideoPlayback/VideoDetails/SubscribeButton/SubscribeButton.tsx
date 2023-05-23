import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SelectButton from "../../../../components/SelectButton/SelectButton";
import "./SubscribeButton.scss";
import { MaterialIcon } from "../../../../types/types";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useSubscribe } from "../../../../hooks/useSubscribe";
import SubscribeDialogBox from "./SubscribeDialogBox/SubscribeDialogBox";
import { useLogin } from "../../../../hooks/useLogin";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { subscribeToChannelThunk, unsubscribeFromChannelThunk } from "../../../../redux/thunks/subscriptionsThunk";
import { ModalPortal } from "../../../../utils/ModalPortal";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";

const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

interface ISubscribeButtonProps {
  channelId: string;
  channelTitle: string;
}

export default function SubscribeButton({ channelId, channelTitle }: ISubscribeButtonProps) {
  const dispatch = useAppDispatch();
  const [endIcon, setEndIcon] = useState<MaterialIcon>();
  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const [isDialogBoxClicked, setIsDialogBoxClicked] = useState<boolean>(false);
  const [shouldOpenConfirmationModal, setShouldOpenConfirmationModal] = useState<boolean>(false);
  const [showSubscriptionBtnOptions, setShowSubscriptionBtnOptions] = useState<boolean>(false);

  const { idToUnsubscribe } = useSubscribe(channelId);

  const btnRef = useRef<HTMLDivElement>(null);

  const [subscriptionBtnValue, setSubscriptionBtnValue] = useState<string>("");

  const { login } = useLogin();

  const { isSubscribed } = useSubscribe(channelId);
  const { isLoggedIn } = useLogin();

  const subscribeBtnWrapperRef = useRef<HTMLDivElement>(null);

  const closeDialogBox = () => {
    setShowDialogBox(false);
  };

  const hideSubscriptionBtnOptions = () => {
    setShowSubscriptionBtnOptions(false);
  };

  useOutsideClick(btnRef, hideSubscriptionBtnOptions);

  useOutsideClick(subscribeBtnWrapperRef, closeDialogBox);

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : undefined,
    endIcon: isSubscribed && isLoggedIn ? endIcon : undefined,
  };

  const handleSubscribeBtnOptionChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setSubscriptionBtnValue(value);
  };

  const handleOnBtnClick = () => {
    if (!isLoggedIn) {
      return setShowDialogBox((previousState) => !previousState);
    } else {
      if (!isSubscribed) {
        return dispatch(subscribeToChannelThunk(channelId));
      }

      setShowSubscriptionBtnOptions((previousState) => !previousState);
    }
  };

  const onDialogBoxClick = () => {
    login();
    setIsDialogBoxClicked(true);
  };

  const handleSubscribeAfterLogin = () => {
    if (isDialogBoxClicked && isLoggedIn && !isSubscribed) {
      dispatch(subscribeToChannelThunk(channelId));
      setIsDialogBoxClicked(false);
      setShowDialogBox(false);
    }
  };

  const closeModal = () => {
    setShouldOpenConfirmationModal(false);
  };

  useEffect(() => {
    handleSubscribeAfterLogin();
  }, [isDialogBoxClicked, isLoggedIn, isSubscribed]);

  useEffect(() => {
    if (showSubscriptionBtnOptions) {
      setEndIcon(ExpandLessIcon);
    } else {
      setEndIcon(ExpandMoreIcon);
    }
  }, [showSubscriptionBtnOptions]);

  useEffect(() => {
    if (subscriptionBtnValue === "unsubscribe") {
      setShouldOpenConfirmationModal(true);
      setShowSubscriptionBtnOptions(false);
      setSubscriptionBtnValue("");
    }
  }, [subscriptionBtnValue]);

  const handleUnsubscribeFromChannel = () => {
    if (idToUnsubscribe) {
      dispatch(unsubscribeFromChannelThunk(idToUnsubscribe));
      closeModal();
    }
  };

  return (
    <div ref={subscribeBtnWrapperRef}>
      <SelectButton
        text={btnConfig.text}
        options={selectOptions}
        showOptions={showSubscriptionBtnOptions}
        onClick={handleOnBtnClick}
        onChangeOption={handleSubscribeBtnOptionChange}
        startIcon={btnConfig.startIcon}
        endIcon={btnConfig.endIcon}
        btnRef={btnRef}
      />
      {showDialogBox && !isLoggedIn && <SubscribeDialogBox onClick={onDialogBoxClick} />}

      <ModalPortal>
        <ConfirmationModal open={shouldOpenConfirmationModal} closeModal={closeModal} onConfirm={handleUnsubscribeFromChannel} title={channelTitle} />
      </ModalPortal>
    </div>
  );
}
