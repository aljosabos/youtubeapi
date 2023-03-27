import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { subscriptionsSelector, subscriptionsStatusSelector } from "../../../redux/slices/subscriptionsSlice";
import { getSubscriptionsThunk } from "../../../redux/thunks/subscriptionsThunk";
import Button from "../../../components/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Subscriptions() {
  const [shouldExpandSubscriptions, setShouldExpandSubscriptions] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const subscriptionsStatus = useAppSelector(subscriptionsStatusSelector);
  const subscriptions = useAppSelector(subscriptionsSelector);

  useEffect(() => {
    if (subscriptionsStatus === "idle") dispatch(getSubscriptionsThunk());
  }, [subscriptionsStatus, dispatch]);

  const toggleExpandSubscriptions = () => {
    if (shouldExpandSubscriptions) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setShouldExpandSubscriptions((previousState) => !previousState);
  };

  return (
    <div className="Subscriptions">
      <div className={`Subscriptions__list ${shouldExpandSubscriptions && "Subscriptions__list-expanded"}`}>
        {subscriptions.map((subscription, index) => (
          <Subscription image={subscription.snippet.thumbnails.high.url} title={subscription.snippet.title} key={index} channelId={subscription.snippet.channelId} />
        ))}
      </div>
      <Button onClick={toggleExpandSubscriptions} text="Show 44 more" startIcon={shouldExpandSubscriptions ? ExpandLessIcon : ExpandMoreIcon} className="Subscriptions__btn" />
    </div>
  );
}
