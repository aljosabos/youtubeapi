import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoSuggestions from "./VideoSuggestions/VideoSuggetions";
import "./VideoPlayback.scss";
import { useParams } from "react-router-dom";
import VideoDetails from "./VideoDetails/VideoDetails";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { videosDetailsSelector } from "../../redux/slices/videoDetailsSlice";
import { getVideoDetailsThunk } from "../../redux/thunks/videoDetailsThunk";

export default function VideoPlayback() {
  const { videoId } = useParams<string>();
  const dispatch = useAppDispatch();
  const videoDetails = useAppSelector(videosDetailsSelector);

  useEffect(() => {
    if (videoId) dispatch(getVideoDetailsThunk(videoId));
  }, [videoId]);

  return (
    <div className="VideoPlayback">
      <div className="VideoPlayback__player">
        {videoId && <VideoPlayer videoId={videoId} />}
        {videoDetails && <VideoDetails {...videoDetails} />}
      </div>
      <VideoSuggestions />
    </div>
  );
}
