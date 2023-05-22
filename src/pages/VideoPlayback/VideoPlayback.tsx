import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./VideoPlayback.scss";
import { useNavigate, useParams } from "react-router-dom";
import VideoDetails from "./VideoDetails/VideoDetails";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { videosDetailsSelector } from "../../redux/slices/videoDetailsSlice";
import { getVideoDetailsThunk } from "../../redux/thunks/videoDetailsThunk";
import RelatedVideos from "./RelatedVideos/RelatedVideos";
import { getRelatedVideosThunk } from "../../redux/thunks/relatedVideosThunk";
import { scrollPageToTop } from "../../utils/utils";
import { relatedVideosSelector } from "../../redux/slices/relatedVideosSlice";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";

/* getRelatedVideosThunk is commented out since the related videos endpoint uses lot of quota (100 per call out from 10000), instead popular videos are used since they use quota of only 1 unit per call */

export default function VideoPlayback() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { videoId } = useParams<string>();

  const videoDetails = useAppSelector(videosDetailsSelector);
  const relatedVideos = useAppSelector(relatedVideosSelector);
  const { recommendedVideos } = useAppSelector(recommendedVideosSelector);

  const [shouldExpandDescription, setShouldExpandDescription] = useState<boolean>(false);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoDetailsThunk(videoId));
      // dispatch(getRelatedVideosThunk(videoId));
      scrollPageToTop();
      setShouldExpandDescription(false);
    }
  }, [videoId]);

  const handleClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="VideoPlayback">
      <div className="VideoPlayback__player">
        {videoId && <VideoPlayer videoId={videoId} />}
        {videoDetails && <VideoDetails {...videoDetails} shouldExpandDescription={shouldExpandDescription} setShouldExpandDescription={setShouldExpandDescription} />}
      </div>
      {videoId && <RelatedVideos videos={recommendedVideos} onClick={handleClick} />}
    </div>
  );
}
