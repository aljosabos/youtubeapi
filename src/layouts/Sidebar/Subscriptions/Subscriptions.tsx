import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { subscriptionsSelector, subscriptionsStatusSelector } from "../../../redux/slices/subscriptionsSlice";
import { getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector);

  useEffect(() => {
    if (subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [subscriptionsStatus, dispatch]);

  return (
    <div className="Subscriptions">
      {subscriptions.map((subscription, index) => (
        <Subscription image={subscription.snippet.thumbnails.high.url} title={subscription.snippet.title} key={index} channelId={subscription.snippet.channelId} />
      ))}
    </div>
  );
}
