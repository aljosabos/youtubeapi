import "./SubscriptionList.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";

import { getMoreSubscriptionsThunk, getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ACCESS_TOKEN, COLLAPSED_SUBSCRIPTIONS_NUM } from "../../../constants/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { SCROLLABLE_JSX } from "../../../constants/libraryPropsConstants";
import { scrollElementToTop } from "../../../utils/utils";
import { subscriptionsSelector } from "../../../redux/slices/subscriptionsSlice";

export default function SubscriptionList() {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement | null>(null);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [shouldExpandList, setShouldExpandList] = useState<boolean>(false);

  const { subscriptions, nextPageToken, totalCount } = useAppSelector(subscriptionsSelector);

  useEffect(() => {
    if (accessToken) dispatch(getSubscriptionsThunk(accessToken));
  }, [accessToken]);

  const jsxConfig = shouldExpandList
    ? { btn: { text: "Show less", icon: ExpandLessIcon }, rootClass: "SubscriptionList-expanded" }
    : {
        btn: { text: `Show ${totalCount - COLLAPSED_SUBSCRIPTIONS_NUM} more`, icon: ExpandMoreIcon },
        rootClass: "SubscriptionList",
      };

  const handleOnClick = () => {
    scrollElementToTop(listRef);
    setShouldExpandList((previousState) => !previousState);
  };

  const loadMoreSubscriptions = () => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;
    dispatch(getMoreSubscriptionsThunk(nextPageTokenParam));
  };

  return (
    <>
      <div id={SCROLLABLE_JSX} className={jsxConfig.rootClass} ref={listRef}>
        <InfiniteScroll
          dataLength={subscriptions.length}
          next={loadMoreSubscriptions}
          hasMore={!!nextPageToken}
          scrollableTarget={SCROLLABLE_JSX}
          loader={<h4>Loading...</h4>}
        >
          {subscriptions?.map((subscription, index) => (
            <Subscription
              image={subscription?.snippet?.thumbnails?.high?.url}
              title={subscription?.snippet?.title}
              key={index}
              channelId={subscription?.snippet?.channelId}
            />
          ))}
        </InfiniteScroll>
      </div>

      <Button onClick={handleOnClick} text={jsxConfig.btn.text} startIcon={jsxConfig.btn.icon} className="SubscriptionList__btn" />
    </>
  );
}
