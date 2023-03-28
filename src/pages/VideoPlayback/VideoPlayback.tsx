import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoSuggestions from "./VideoSuggestions/VideoSuggetions";
import "./VideoPlayback.scss";
import { useParams } from "react-router-dom";

export default function VideoPlayback() {
  const { videoId } = useParams<string>();

  return (
    <div className="VideoPlayback">
      {videoId && <VideoPlayer videoId={videoId} />}
      <VideoSuggestions />
    </div>
  );
}
