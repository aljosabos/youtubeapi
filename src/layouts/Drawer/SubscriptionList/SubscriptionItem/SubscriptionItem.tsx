import "./SubscriptionItem.scss";
import { Avatar } from "@mui/material";

interface ISubscriptionItemProps {
  channelId: string;
  image: string;
  title: string;
  onClick: (channelId: string) => void;
}

export default function SubscriptionItem({ channelId, image, title, onClick }: ISubscriptionItemProps) {
  return (
    <div className="Subscription" onClick={() => onClick(channelId)}>
      <Avatar alt="Subscriptions avatar" src={image} className="Subscription__avatar" />
      <span className="Subscription__name">{title}</span>
    </div>
  );
}
