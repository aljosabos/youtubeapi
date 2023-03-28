import YouTube from "react-youtube";
import { PLAYER_OPTIONS } from "../../../constants/libraryProps";
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
