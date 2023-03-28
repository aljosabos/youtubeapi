import YouTube, { YouTubeEvent } from "react-youtube";
import { PLAYER_OPTIONS } from "../../../data/constants";
import "./VideoPlayer.scss";

interface IVideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: IVideoPlayerProps) {
  return (
    <div className="VideoPlayer">
      <YouTube videoId={videoId} loading="lazy" opts={PLAYER_OPTIONS} iframeClassName="VideoPlayer__iframe" className="VideoPlayer__youtube" />
    </div>
  );
}
