import "./SubscriptionItem.scss";
import { Avatar } from "@mui/material";

interface ISubscriptionItemProps {
  channelId: string;
  image: string;
  title: string;
  onClick: (channelId: string) => void;
  largeView?: boolean;
}

export default function SubscriptionItem({ channelId, image, title, onClick, largeView = false }: ISubscriptionItemProps) {
  const addClass = (className: string) => (largeView ? `${className}-large` : className);
  return (
    <div className={addClass("Subscription")} onClick={() => onClick(channelId)}>
      <Avatar alt="Subscriptions avatar" src={image} className={addClass("Subscription__avatar")} />
      <span className={addClass("Subscription__name")}>{title}</span>
    </div>
  );
}
