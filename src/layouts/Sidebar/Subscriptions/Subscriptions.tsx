import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { subscriptionsSelector, subscriptionsStatusSelector } from "../../../redux/slices/subscriptionsSlice";
import { getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import { ISubscriptionsResponse } from "../../../types/response";

export default function Subscriptions() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));
  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector) as ISubscriptionsResponse[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [accessToken]);

  return (
    <div className="Subscriptions">
      {subscriptions.map((subscription, index) => (
        <Subscription image={subscription.snippet.thumbnails.high.url} title={subscription.snippet.title} key={index} channelId={subscription.snippet.channelId} />
      ))}
    </div>
  );
}
