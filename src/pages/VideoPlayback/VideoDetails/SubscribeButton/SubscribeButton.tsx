import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import SelectButton from "../../../../components/SelectButton/SelectButton";
import "./SubscribeButton.scss";
import { MaterialIcon } from "../../../../types/types";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useSubscribe } from "../../../../hooks/useSubscribe";
import DialogBox from "../../../../components/DialogBox/DialogBox";
import SubscribeDialogBox from "./SubscribeDialogBox/SubscribeDialogBox";
import { useLogin } from "../../../../hooks/useLogin";

const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

interface ISubscribeButtonProps {
  elementRef?: React.RefObject<HTMLDivElement>;
  showSubscriptionBtnOptions: boolean;
  setShowSubscriptionBtnOptions: Dispatch<SetStateAction<boolean>>;
  channelId: string;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export default function SubscribeButton({
  elementRef,
  showSubscriptionBtnOptions,
  setShowSubscriptionBtnOptions,
  channelId,
  onChange,
}: ISubscribeButtonProps) {
  const [endIcon, setEndIcon] = useState<MaterialIcon>();
  const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
  const { isSubscribed } = useSubscribe(channelId);
  const { isLoggedIn } = useLogin();

  const btnConfig = {
    text: isSubscribed ? "Subscribed" : "Subscribe",
    startIcon: isSubscribed ? NotificationsNoneIcon : undefined,
    endIcon: isSubscribed ? endIcon : undefined,
  };

  const toggleShowOptions = () => {
    if (!isSubscribed) return;
    setShowSubscriptionBtnOptions((previousState) => !previousState);
  };

  const handleOnClick = () => {
    if (!isLoggedIn) {
      return setShowDialogBox(true);
    } else {
      if (!isSubscribed) return;
      setShowSubscriptionBtnOptions((previousState) => !previousState);
    }
  };

  useEffect(() => {
    if (showSubscriptionBtnOptions) {
      setEndIcon(ExpandLessIcon);
    } else {
      setEndIcon(ExpandMoreIcon);
    }
  }, [showSubscriptionBtnOptions]);

  return (
    <div>
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
      {showDialogBox && <SubscribeDialogBox />}
    </div>
  );
}
