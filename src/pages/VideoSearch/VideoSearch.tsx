import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { IVideo } from "../../types/types";
import "./VideoSearch.scss";
import { useEffect } from "react";
import { getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";

export default function VideoSearch() {
  const { recommendedVideos } = useAppSelector(recommendedVideosSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    dispatch(getRecommendedVideosThunk());
  }, []);

  return (
    <div className="VideoSearch">
      {recommendedVideos?.map((video: IVideo, index) => (
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
  );
}
