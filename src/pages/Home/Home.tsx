import { useEffect } from "react";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getInitialVideosThunk, getMoreVideosThunk } from "../../redux/thunks/videosThunk";
import { videosSelector } from "../../redux/slices/videosSlice";
import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { IVideo } from "../../types/types";

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { videos, nextPageToken } = useAppSelector(videosSelector);

  useEffect(() => {
    dispatch(getInitialVideosThunk());
  }, []);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  const loadMoreVideos = () => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;
    dispatch(getMoreVideosThunk(nextPageTokenParam));
  };

  return (
    <InfiniteScroll
      className="Home"
      dataLength={videos.length}
      next={loadMoreVideos}
      hasMore={!!nextPageToken}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {videos?.map((video: IVideo, index) => (
        <VideoCard {...video} key={index} onClick={() => openVideoURL(video.id)} />
      ))}
    </InfiniteScroll>
  );
}
