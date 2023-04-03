import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./VideoPlayback.scss";
import { useParams } from "react-router-dom";
import VideoDetails from "./VideoDetails/VideoDetails";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { videosDetailsSelector } from "../../redux/slices/videoDetailsSlice";
import { getVideoDetailsThunk } from "../../redux/thunks/videoDetailsThunk";
import RelatedVideos from "./RelatedVideos/RelatedVideos";

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
      {videoId && <RelatedVideos videoId={videoId} />}
    </div>
  );
}
