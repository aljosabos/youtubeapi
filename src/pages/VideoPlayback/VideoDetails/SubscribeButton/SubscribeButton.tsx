import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
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
import { subscribeToChannelThunk } from "../../../../redux/thunks/subscriptionsThunk";

const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

interface ISubscribeButtonProps {
  elementRef?: React.RefObject<HTMLDivElement>;
  showSubscriptionBtnOptions: boolean;
  setShowSubscriptionBtnOptions: Dispatch<SetStateAction<boolean>>;
  channelId: string;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
  dialogRef?: RefObject<HTMLDivElement>;
}

export default function SubscribeButton({
  elementRef,
  showSubscriptionBtnOptions,
  setShowSubscriptionBtnOptions,
  channelId,
  onChange,
}: ISubscribeButtonProps) {
  const dispatch = useAppDispatch();
  const [endIcon, setEndIcon] = useState<MaterialIcon>();
  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const [dialogBoxClicked, setDialogBoxClicked] = useState<boolean>(false);

  const { login } = useLogin();

  const { isSubscribed } = useSubscribe(channelId);
  const { isLoggedIn } = useLogin();

  const subscribeBtnWrapperRef = useRef<HTMLDivElement>(null);

  const closeDialogBox = () => {
    setShowDialogBox(false);
  };

  useOutsideClick(subscribeBtnWrapperRef, closeDialogBox);

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : undefined,
    endIcon: isSubscribed && isLoggedIn ? endIcon : undefined,
  };

  const handleOnClick = () => {
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
    setDialogBoxClicked(true);
  };

  useEffect(() => {
    if (dialogBoxClicked && isLoggedIn && !isSubscribed) {
      dispatch(subscribeToChannelThunk(channelId));
      setDialogBoxClicked(false);
      setShowDialogBox(false);
    }
  }, [dialogBoxClicked, isLoggedIn]);

  useEffect(() => {
    if (showSubscriptionBtnOptions) {
      setEndIcon(ExpandLessIcon);
    } else {
      setEndIcon(ExpandMoreIcon);
    }
  }, [showSubscriptionBtnOptions]);

  return (
    <div ref={subscribeBtnWrapperRef}>
      <SelectButton
        text={btnConfig.text}
        options={selectOptions}
        expandOptions={showSubscriptionBtnOptions}
        onClick={handleOnClick}
        onChange={onChange}
        startIcon={btnConfig.startIcon}
        endIcon={btnConfig.endIcon}
        elementRef={elementRef}
      />
      {showDialogBox && !isLoggedIn && <SubscribeDialogBox onClick={onDialogBoxClick} />}
    </div>
  );
}
