import { useEffect } from "react";
import Video from "../../components/Video/Video";
import { IVideo } from "../../types/response";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getInitialVideosThunk, getMoreVideosThunk } from "../../redux/thunks/videosThunk";
import { nextPageTokenSelector, videosSelector } from "../../redux/slices/videosSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(videosSelector);
  const nextPageToken = useAppSelector(nextPageTokenSelector);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInitialVideosThunk());
  }, []);

  const loadMoreVideos = () => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;
    dispatch(getMoreVideosThunk(nextPageTokenParam));
  };

  const watchVideo = (videoId: string) => {
    navigate(`/video/${videoId}`);
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
      {videos.map((video: IVideo) => (
        <Video {...video} key={video.id} onClick={() => watchVideo(video.id)} />
      ))}
    </InfiniteScroll>
  );
}
