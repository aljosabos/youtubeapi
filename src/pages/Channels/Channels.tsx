import InfiniteScroll from "react-infinite-scroll-component";
import ChannelInfo from "../../components/ChannelInfo/ChannelInfo";
import "./Channels.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { getMoreRecommendedVideosThunk, getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useNavigate } from "react-router-dom";
import { IVideo } from "../../types/types";
import { useEffect } from "react";

export default function Channels() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { recommendedVideos, nextPageToken } = useAppSelector(recommendedVideosSelector);

  const loadMoreVideos = () => {
    dispatch(getMoreRecommendedVideosThunk(nextPageToken));
  };

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    dispatch(getRecommendedVideosThunk());
  }, []);

  return (
    <div className="Channels">
      <ChannelInfo />

      <div data-testid="infinite-scroll">
        <InfiniteScroll
          className="Channels__wrapper"
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
    </div>
  );
}
