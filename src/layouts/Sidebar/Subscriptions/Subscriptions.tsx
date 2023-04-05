import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { nextPageTokenSelector, subscriptionsSelector, totalCountSelector } from "../../../redux/slices/subscriptionsSlice";
import { getMoreSubscriptionsThunk, getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ACCESS_TOKEN, COLLAPSED_SUBSCRIPTIONS_NUM } from "../../../constants/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { SCROLLABLE_JSX } from "../../../constants/libraryPropsConstants";
import { scrollToTop } from "../../../utils/utils";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const [shouldExpandSubscriptions, setShouldExpandSubscriptions] = useState<boolean>(false);

  const subscriptions = useAppSelector(subscriptionsSelector);
  const nextPageToken = useAppSelector(nextPageTokenSelector);
  const totalCount = useAppSelector(totalCountSelector);

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (accessToken) dispatch(getSubscriptionsThunk(accessToken));
  }, [accessToken]);

  const handleOnClick = () => {
    scrollToTop(listRef);
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

      <Button
        onClick={handleOnClick}
        text={btnText}
        startIcon={shouldExpandSubscriptions ? ExpandLessIcon : ExpandMoreIcon}
        className="Subscriptions__btn"
      />
    </div>
  );
}
