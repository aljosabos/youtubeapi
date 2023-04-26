import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { IVideo } from "../../types/types";
import "./VideoSearch.scss";
import { getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";
import { searchedVideosSelector } from "../../redux/slices/searchVideosSlice";

export default function VideoSearch() {
  const { recommendedVideos } = useAppSelector(recommendedVideosSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchedVideos = useAppSelector(searchedVideosSelector);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  // useEffect(() => {
  //   // dispatch(getRecommendedVideosThunk());
  // }, []);

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
            onClick={() => openVideoURL(video.id)}
          />
        ))}
      </div>
    </div>
  );
}
