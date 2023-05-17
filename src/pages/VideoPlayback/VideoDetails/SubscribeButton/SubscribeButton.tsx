import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectButton from "../../../../components/SelectButton/SelectButton";
import "./SubscribeButton.scss";
import { MaterialIcon } from "../../../../types/types";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useIsSubscribed } from "../../../../hooks/useIsSubscribed";

const selectOptions = [{ name: "Unsubscribe", value: "unsubscribe", icon: PersonOffIcon }];

interface ISubscribeButtonProps {
  elementRef?: React.RefObject<HTMLDivElement>;
  showSubscriptionBtnOptions: boolean;
  setShowSubscriptionBtnOptions: Dispatch<SetStateAction<boolean>>;
  channelId: string;
}

export default function SubscribeButton({ elementRef, showSubscriptionBtnOptions, setShowSubscriptionBtnOptions, channelId }: ISubscribeButtonProps) {
  const [endIcon, setEndIcon] = useState<MaterialIcon>();
  const [value, setValue] = useState<string>();
  const { isSubscribed } = useIsSubscribed(channelId);
  const btnText = isSubscribed ? "Subscribed" : "Subscribe";

  const toggleShowOptions = () => {
    // if (!isSubscribed) return;
    setShowSubscriptionBtnOptions((previousState) => !previousState);
  };

  const handleOnChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setValue(value);
  };

  useEffect(() => {
    if (showSubscriptionBtnOptions) {
      setEndIcon(ExpandLessIcon);
    } else {
      setEndIcon(ExpandMoreIcon);
    }
  }, [showSubscriptionBtnOptions, isSubscribed]);

  return (
    <SelectButton
      text={btnText}
      options={selectOptions}
      expandOptions={showSubscriptionBtnOptions}
      onClick={toggleShowOptions}
      onChange={handleOnChange}
      startIcon={NotificationsNoneIcon}
      endIcon={endIcon}
      elementRef={elementRef}
    />
  );
}
