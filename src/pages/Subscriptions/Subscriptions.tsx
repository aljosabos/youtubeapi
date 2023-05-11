import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { subscriptionsSelector } from "../../redux/slices/subscriptionsSlice";
import "./Subscriptions.scss";
import SubscriptionItem from "../../layouts/Drawer/SubscriptionList/SubscriptionItem/SubscriptionItem";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants/constants";
import { getSubscriptionsThunk } from "../../redux/thunks/subscriptionsThunk";
import DialogBox from "../../components/DialogBox/DialogBox";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useTranslation } from "react-i18next";

export default function Subscriptions() {
  const { t } = useTranslation();
  const { subscriptions } = useAppSelector(subscriptionsSelector);
  const noSubscriptions = !subscriptions.length;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const openChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  useEffect(() => {
    if (accessToken) dispatch(getSubscriptionsThunk(accessToken));
  }, [accessToken]);

  return (
    <>
      {noSubscriptions ? (
        <DialogBox icon={VideoLibraryIcon} title={t("dialogBox.noSubscriptions.title")} text={t("dialogBox.noSubscriptions.text")} />
      ) : (
        <div className="Subscriptions">
          {subscriptions?.map((subscription, index) => (
            <SubscriptionItem largeView {...subscription} key={index} onClick={() => openChannel(subscription.channelId)} />
          ))}
        </div>
      )}
    </>
  );
}
