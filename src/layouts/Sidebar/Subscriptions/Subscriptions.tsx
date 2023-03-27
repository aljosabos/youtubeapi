import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { subscriptionsSelector, subscriptionsStatusSelector } from "../../../redux/slices/subscriptionsSlice";
import { getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { COLLAPSED_SUBSCRIPTIONS_NUM } from "../../../data/constants";

export default function Subscriptions() {
  const [shouldExpandSubscriptions, setShouldExpandSubscriptions] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector);
  const [totalCount, setTotalCount] = useState<number>();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [subscriptionsStatus, dispatch]);

  useEffect(() => {
    if (subscriptions) setTotalCount(Number(subscriptions[0].contentDetails.totalItemCount));
  }, [subscriptions]);

  const scrollListToTop = () => {
    if (listRef.current)
      listRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
  };

  const toggleExpandSubscriptions = () => {
    scrollListToTop();
    setShouldExpandSubscriptions((previousState) => !previousState);
  };

  return (
    <div className="Subscriptions">
      <div className={`Subscriptions__list ${shouldExpandSubscriptions && "Subscriptions__list-expanded"}`} ref={listRef}>
        {subscriptions.map((subscription, index) => (
          <Subscription image={subscription.snippet.thumbnails.high.url} title={subscription.snippet.title} key={index} channelId={subscription.snippet.channelId} />
        ))}
      </div>
      <Button onClick={toggleExpandSubscriptions} text={`show ${totalCount && totalCount - COLLAPSED_SUBSCRIPTIONS_NUM} more`} startIcon={shouldExpandSubscriptions ? ExpandLessIcon : ExpandMoreIcon} className="Subscriptions__btn" />
    </div>
  );
}
