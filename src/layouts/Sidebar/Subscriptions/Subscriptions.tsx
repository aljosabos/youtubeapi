import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  nextPageTokenSelector,
  subscriptionsSelector,
  subscriptionsStatusSelector,
  totalCountSelector,
} from "../../../redux/slices/subscriptionsSlice";
import { getMoreSubscriptionsThunk, getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { COLLAPSED_SUBSCRIPTIONS_NUM, SCROLLABLE_JSX } from "../../../data/constants";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const [shouldExpandSubscriptions, setShouldExpandSubscriptions] = useState<boolean>(false);

  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector);
  const nextPageToken = useAppSelector(nextPageTokenSelector);
  const totalCount = useAppSelector(totalCountSelector);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [subscriptionsStatus, dispatch]);

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

  const btnText = shouldExpandSubscriptions ? "Show less" : `Show ${totalCount - COLLAPSED_SUBSCRIPTIONS_NUM} more`;

  const loadMoreSubscriptions = () => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;
    dispatch(getMoreSubscriptionsThunk(nextPageTokenParam));
  };

  return (
    <div className="Subscriptions">
      <div id={SCROLLABLE_JSX} className={`Subscriptions__list ${shouldExpandSubscriptions && "Subscriptions__list-expanded"}`} ref={listRef}>
        <InfiniteScroll
          dataLength={subscriptions.length}
          next={loadMoreSubscriptions}
          hasMore={!!nextPageToken}
          scrollableTarget={SCROLLABLE_JSX}
          loader={<h4>Loading...</h4>}
        >
          {subscriptions.map((subscription, index) => (
            <Subscription
              image={subscription.snippet.thumbnails.high.url}
              title={subscription.snippet.title}
              key={index}
              channelId={subscription.snippet.channelId}
            />
          ))}
        </InfiniteScroll>
      </div>

      <Button
        onClick={toggleExpandSubscriptions}
        text={btnText}
        startIcon={shouldExpandSubscriptions ? ExpandLessIcon : ExpandMoreIcon}
        className="Subscriptions__btn"
      />
    </div>
  );
}
