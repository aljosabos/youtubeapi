import "./SubscriptionList.scss";
import Subscription from "./SubscriptionItem/SubscriptionItem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getMoreSubscriptionsThunk, getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ACCESS_TOKEN, COLLAPSED_SUBSCRIPTIONS_NUM } from "../../../constants/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { SCROLLABLE_JSX } from "../../../constants/libraryPropsConstants";
import { scrollElementToTop } from "../../../utils/utils";
import { subscriptionsSelector } from "../../../redux/slices/subscriptionsSlice";
import { useNavigate } from "react-router-dom";

export default function SubscriptionList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const listRef = useRef<HTMLDivElement | null>(null);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [shouldExpandList, setShouldExpandList] = useState<boolean>(false);

  const { subscriptions, nextPageToken } = useAppSelector(subscriptionsSelector);

  useEffect(() => {
    if (accessToken) dispatch(getSubscriptionsThunk(accessToken));
  }, [accessToken]);

  const jsxConfig = {
    btnText: shouldExpandList ? "Show less" : "Show more",
    btnIcon: shouldExpandList ? ExpandLessIcon : ExpandMoreIcon,
    rootClass: shouldExpandList ? "SubscriptionList-scroller--expanded" : "SubscriptionList-scroller",
  };

  const handleBtnClick = () => {
    scrollElementToTop(listRef);
    setShouldExpandList((previousState) => !previousState);
  };

  const openChannel = (channelId: string) => {
    navigate(`channel/${channelId}`);
  };

  const loadMoreSubscriptions = () => {
    console.log("more");
    dispatch(getMoreSubscriptionsThunk(nextPageToken));
  };

  console.log(subscriptions.length);

  return (
    <div className="SubscriptionList">
      <div ref={listRef}>
        <InfiniteScroll
          className={jsxConfig.rootClass}
          dataLength={subscriptions.length}
          next={loadMoreSubscriptions}
          hasMore={!!nextPageToken}
          loader={<h4>Loading...</h4>}
        >
          {subscriptions?.map((subscription, index) => (
            <Subscription {...subscription} key={index} onClick={openChannel} />
          ))}
        </InfiniteScroll>
      </div>
      {subscriptions.length > COLLAPSED_SUBSCRIPTIONS_NUM && (
        <Button onClick={handleBtnClick} text={jsxConfig.btnText} startIcon={jsxConfig.btnIcon} className="SubscriptionList__btn" />
      )}
    </div>
  );
}
