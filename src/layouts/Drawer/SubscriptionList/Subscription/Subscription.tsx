import "./Subscription.scss";
import { Avatar } from "@mui/material";

interface ISubscriptionProps {
  channelId: string;
  image: string;
  title: string;
}

export default function Subscription({ channelId, image, title }: ISubscriptionProps) {
  console.log(channelId);
  return (
    <div className="Subscription">
      <Avatar alt="Subscriptions avatar" src={image} className="Subscription__avatar" />
      <span className="Subscription__name">{title}</span>
    </div>
  );
}
