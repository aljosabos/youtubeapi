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
  const modifier = largeView ? "--large" : "";

  return (
    <div className={`Subscription${modifier}`} onClick={() => onClick(channelId)}>
      <Avatar alt="Subscriptions avatar" src={image} className={`Subscription__avatar${modifier}`} />
      <span className={`Subscription__name${modifier}`}>{title}</span>
    </div>
  );
}
