import { useEffect } from "react";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { IVideo } from "../../types/types";
import { getMoreRecommendedVideosThunk, getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { recommendedVideos, nextPageToken } = useAppSelector(recommendedVideosSelector);

  useEffect(() => {
    dispatch(getRecommendedVideosThunk());
  }, []);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  const loadMoreVideos = () => {
    dispatch(getMoreRecommendedVideosThunk(nextPageToken));
  };

  return (
    <div data-testid="infinite-scroll">
      <InfiniteScroll
        className="Home"
        dataLength={recommendedVideos.length}
        next={loadMoreVideos}
        hasMore={!!nextPageToken}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {recommendedVideos?.map((video: IVideo, index) => (
          <VideoCard ariaLabel="video-card" {...video} key={index} onClick={() => openVideoURL(video.id)} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
