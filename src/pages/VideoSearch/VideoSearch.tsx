import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { IVideo } from "../../types/types";
import "./VideoSearch.scss";
import { searchedVideosSelector } from "../../redux/slices/searchVideosSlice";

export default function VideoSearch() {
  const navigate = useNavigate();
  const searchedVideos = useAppSelector(searchedVideosSelector);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="VideoSearch">
      <div className="VideoSearch__card-list">
        {searchedVideos?.map((video: IVideo, index) => (
          <VideoCard
            layout="horizontal"
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
