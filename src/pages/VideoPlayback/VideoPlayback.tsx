import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./VideoPlayback.scss";
import { useNavigate, useParams } from "react-router-dom";
import VideoDetails from "./VideoDetails/VideoDetails";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { videosDetailsSelector } from "../../redux/slices/videoDetailsSlice";
import { getVideoDetailsThunk } from "../../redux/thunks/videoDetailsThunk";
import RelatedVideos from "./RelatedVideos/RelatedVideos";
import { getRelatedVideosThunk } from "../../redux/thunks/relatedVideosThunk";
import { scrollToTop } from "../../utils/utils";
import { videosSelector } from "../../redux/slices/videosSlice";

export default function VideoPlayback() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { videoId } = useParams<string>();
  const videoDetails = useAppSelector(videosDetailsSelector);
  const { videos } = useAppSelector(videosSelector);

  const playbackRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (videoId: string) => {
    scrollToTop(playbackRef);
    navigate(`/video/${videoId}`);
  };

  /* getRelatedVideosThunk is commented out since the related videos endpoint uses lot of quota (100 per call out from 10000), instead popular videos are used since they use quota of only 1 unit per call */

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoDetailsThunk(videoId));
      // dispatch(getRelatedVideosThunk(videoId));
    }
  }, [videoId]);

  return (
    <div className="VideoPlayback" ref={playbackRef}>
      <div className="VideoPlayback__player">
        {videoId && <VideoPlayer videoId={videoId} />}
        {videoDetails && <VideoDetails {...videoDetails} />}
      </div>
      {videoId && <RelatedVideos videos={videos} onClick={handleClick} />}
    </div>
  );
}
