import { useEffect } from "react";
import Video from "../../components/Video/Video";
import { IVideoResponse } from "../../types/response";
import {
  formatISOtoHumanReadable,
  formatNumToThousands,
} from "../../utils/dateHelpers";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getInitialVideosThunk, getMoreVideosThunk } from "../../redux/thunks";
import {
  nextPageTokenSelector,
  videosSelector,
  videosStatusSelector,
} from "../../redux/slices/videosSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(videosSelector);
  const videosStatus = useAppSelector(videosStatusSelector);
  const nextPageToken = useAppSelector(nextPageTokenSelector);

  useEffect(() => {
    if (videosStatus === "idle") {
      dispatch(getInitialVideosThunk());
    }
  }, []);

  const loadMoreVideos = () => {
    const nextPageTokenParam = `&${nextPageToken}`;
    dispatch(getMoreVideosThunk(nextPageTokenParam));
  };

  return (
    <InfiniteScroll
      scrollableTarget="scrollable"
      dataLength={videos.length}
      next={loadMoreVideos}
      hasMore={!!nextPageToken}
      loader={<h4>Loading...</h4>}
      className="Home"
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {videos.map((video: IVideoResponse) => (
        <Video
          key={video.id}
          title={video.snippet.title}
          channel={video.snippet.channelTitle}
          image={video.snippet.thumbnails.high.url}
          duration={formatISOtoHumanReadable(video.contentDetails.duration)}
          views={formatNumToThousands(Number(video.statistics.viewCount))}
          publishDate={moment(video.snippet.publishedAt).fromNow()}
        />
      ))}
    </InfiniteScroll>
  );
}
