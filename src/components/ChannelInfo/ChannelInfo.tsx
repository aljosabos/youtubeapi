import Button from "../Button/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ChannelInfo.scss";
import { IChannelInfo } from "../../types/types";

export default function ChannelInfo({ title, customUrl, description, publishedAt, image, subscriberCount, videoCount }: IChannelInfo) {
  return (
    <div className="ChannelInfo">
      {image && <img src={image} className="ChannelInfo__image" alt="ChannelInfo__image" />}
      <div className="ChannelInfo__text">
        <h2 className="ChannelInfo__text-title">{title}</h2>
        <div className="ChannelInfo__text-details">
          <span>{customUrl}</span>
          <span>{subscriberCount}K subscribers</span>
          <span>{videoCount} videos</span>
        </div>
        <Button text="More about this channel" variant="text" endIcon={ArrowForwardIosIcon} />
      </div>
    </div>
  );
}
