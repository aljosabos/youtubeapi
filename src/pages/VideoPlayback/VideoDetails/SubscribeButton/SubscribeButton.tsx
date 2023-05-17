import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectButton from "../../../../components/SelectButton/SelectButton";
import "./SubscribeButton.scss";
import { MaterialIcon } from "../../../../types/types";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const selectOptions = [
  { name: "item 1", value: "item 1" },
  { name: "item 2", value: "item 2" },
  { name: "item 3", value: "item 3" },
];

interface ISubscribeButtonProps {
  elementRef?: React.RefObject<HTMLDivElement>;
  showSubscriptionBtnOptions: boolean;
  setShowSubscriptionBtnOptions: Dispatch<SetStateAction<boolean>>;
}

export default function SubscribeButton({ elementRef, showSubscriptionBtnOptions, setShowSubscriptionBtnOptions }: ISubscribeButtonProps) {
  const [subscriptionBtnEndIcon, setSubscriptionBtnEndIcon] = useState<MaterialIcon>();
  const [, setSubscriptionBtnValue] = useState<string>();

  const toggleExpandSubscriptionOptions = () => {
    setShowSubscriptionBtnOptions((previousState) => !previousState);
  };

  const handleSubscriptionBtnOnChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLElement).getAttribute("data-value");
    if (value) setSubscriptionBtnValue(value);
  };

  useEffect(() => {
    if (showSubscriptionBtnOptions) {
      setSubscriptionBtnEndIcon(ExpandLessIcon);
    } else {
      setSubscriptionBtnEndIcon(ExpandMoreIcon);
    }
  }, [showSubscriptionBtnOptions]);

  return (
    <SelectButton
      text="Subscribed"
      options={selectOptions}
      expandOptions={showSubscriptionBtnOptions}
      onClick={toggleExpandSubscriptionOptions}
      onChange={handleSubscriptionBtnOnChange}
      startIcon={NotificationsNoneIcon}
      endIcon={subscriptionBtnEndIcon}
      elementRef={elementRef}
    />
  );
}
