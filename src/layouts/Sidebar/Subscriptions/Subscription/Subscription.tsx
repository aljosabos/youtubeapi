import "./Subscription.scss";
import { Avatar } from "@mui/material";

export default function Subscription() {
  return (
    <div className="Subscription">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className="Subscription__avatar" />
      <span className="Subscription__name">Some subscription</span>
    </div>
  );
}
