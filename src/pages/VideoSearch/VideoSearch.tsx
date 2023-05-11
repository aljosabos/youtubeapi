import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IVideo } from "../../types/types";
import "./VideoSearch.scss";
import { searchedVideosSelector } from "../../redux/slices/searchVideosSlice";
import { useWindowResize } from "../../hooks/useWindowResize";
import { LARGE_WIDTH, MEDIUM_WIDTH } from "../../constants/constants";

export default function VideoSearch() {
  const navigate = useNavigate();
  const searchedVideos = useAppSelector(searchedVideosSelector);
  const { isResized } = useWindowResize(MEDIUM_WIDTH);
  const layout = isResized ? undefined : "horizontal";

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="VideoSearch">
      <div className="VideoSearch__card-list">
        {searchedVideos?.map((video: IVideo, index) => (
          <VideoCard
            layout={layout}
            wrapperClassName="VideoSearch__card"
            ariaLabel="video-card"
            {...video}
            key={index}
            showDescriptionPreview
            onClick={() => openVideoURL(video.id)}
          />
        ))}
      </div>
    </div>
  );
}
