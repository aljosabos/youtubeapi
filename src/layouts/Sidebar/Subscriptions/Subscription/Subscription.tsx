import "./Subscription.scss";
import { Avatar } from "@mui/material";

interface ISubscriptionProps {
  channelId: string;
  image: string;
  title: string;
}

export default function Subscription({ channelId, image, title }: ISubscriptionProps) {
  return (
    <div className="Subscription">
      <Avatar alt="Remy Sharp" src={image} className="Subscription__avatar" />
      <span className="Subscription__name">{title}</span>
    </div>
  );
}
