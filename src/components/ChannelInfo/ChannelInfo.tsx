import Button from "../Button/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ChannelInfo.scss";

export default function ChannelInfo() {
  return (
    <div className="ChannelInfo">
      <img src="" alt="ChannelInfo__avatar" />
      <div className="ChannelInfo__text">
        <h2 className="ChannelInfo__text-name">Dragan Petrovic</h2>
        <div className="ChannelInfo__text-details">
          <span>@draganpetrovic3139</span>
          <span>20.2 subscribers</span>
          <span>417 videos</span>
        </div>
        <Button text="More about this channel" variant="text" endIcon={ArrowForwardIosIcon} />
      </div>
    </div>
  );
}
