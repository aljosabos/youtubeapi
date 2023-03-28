import YouTube, { YouTubeEvent } from "react-youtube";
import "./VideoPlayer.scss";

interface IVideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: IVideoPlayerProps) {
  const opts = {
    playerVars: {
      autoplay: 1,
      rel: 0,
      showinfo: 0,
      ecver: 2,
    },
  };

  const onReady = (event: YouTubeEvent) => {
    console.log(event.target);
  };

  return (
    <div className="VideoPlayer">
      <YouTube videoId={videoId} onPlay={onReady} loading="lazy" opts={opts} iframeClassName="VideoPlayer__iframe" className="VideoPlayer__youtube" />
    </div>
  );
}
