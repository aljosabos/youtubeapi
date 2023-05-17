import { subscriptionsSelector } from "../redux/slices/subscriptionsSlice";
import { useAppSelector } from "./reduxHooks";

export const useIsSubscribed = (channelId: string) => {
  const { subscriptions } = useAppSelector(subscriptionsSelector);

  const subscription = subscriptions.filter(
    (subscription) => subscription.channelId === channelId
  )[0];

  return { isSubscribed: !!subscription };
};
