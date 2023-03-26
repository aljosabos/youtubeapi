import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { subscriptionsSelector, subscriptionsStatusSelector } from "../../../redux/slices/subscriptionsSlice";
import { getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import { isLoggedInSelector } from "../../../redux/slices/userSlice";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const [accessToken, _] = useState<string | null>(localStorage.getItem("access_token"));
  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  useEffect(() => {
    if (accessToken && subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [accessToken, subscriptionsStatus]);

  return (
    <div className="Subscriptions">
      {isLoggedIn ? subscriptions.map((subscription, index) => <Subscription image={subscription.snippet.thumbnails.high.url} title={subscription.snippet.title} key={index} channelId={subscription.snippet.channelId} />) : <div>Please log in </div>}
    </div>
  );
}
