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

const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

interface ISubscribeButtonProps {
  elementRef?: React.RefObject<HTMLDivElement>;
  showSubscriptionBtnOptions: boolean;
  setShowSubscriptionBtnOptions: Dispatch<SetStateAction<boolean>>;
  channelId: string;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
  dialogRef?: RefObject<HTMLDivElement>;
  shouldShowDialogBox?: boolean;
  setShouldShowDialogBox: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}

export default function SubscribeButton({
  elementRef,
  showSubscriptionBtnOptions,
  setShowSubscriptionBtnOptions,
  channelId,
  onChange,
  shouldShowDialogBox,
  setShouldShowDialogBox,
  onClick,
}: ISubscribeButtonProps) {
  const dispatch = useAppDispatch();
  const [endIcon, setEndIcon] = useState<MaterialIcon>();

  const { isSubscribed } = useSubscribe(channelId);
  const { isLoggedIn } = useLogin();

  const subscribeBtnWrapperRef = useRef<HTMLDivElement>(null);

  // const closeDialogBox = () => {
  //   setShowDialogBox(false);
  // };

  const closeDialogBox = () => {
    setShouldShowDialogBox(false);
  };

  useOutsideClick(subscribeBtnWrapperRef, closeDialogBox);

  const btnConfig = {
    text: isSubscribed && isLoggedIn ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed && isLoggedIn ? NotificationsNoneIcon : undefined,
    endIcon: isSubscribed && isLoggedIn ? endIcon : undefined,
  };

  // const handleOnClick = () => {
  //   if (!isLoggedIn) {
  //     return setShowDialogBox((previousState) => !previousState);
  //   } else {
  //     if (!isSubscribed) {
  //       return dispatch(subscribeToChannelThunk(channelId));
  //     }

  //     setShowSubscriptionBtnOptions((previousState) => !previousState);
  //   }
  // };

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
        onClick={onClick}
        onChange={onChange}
        startIcon={btnConfig.startIcon}
        endIcon={btnConfig.endIcon}
        elementRef={elementRef}
      />
      {shouldShowDialogBox && <SubscribeDialogBox />}
    </div>
  );
}
