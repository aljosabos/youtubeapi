import { useEffect } from "react";
import "./Home.scss";
import {
  Video,
  IVideoResponse,
  formatISOtoHumanReadable,
  formatNumToThousands,
  InfiniteScroll,
  moment,
  useAppDispatch,
  useAppSelector,
  initialVideosLoadThunk,
  loadMoreVideosThunk,
  nextPageTokenSelector,
  videosSelector,
  videosStatusSelector,
} from "../../exports/homeExports";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(videosSelector);
  const videosStatus = useAppSelector(videosStatusSelector);
  const nextPageToken = useAppSelector(nextPageTokenSelector);

  useEffect(() => {
    if (videosStatus === "idle") {
      dispatch(initialVideosLoadThunk());
    }
  }, []);

  const loadMoreVideos = () => {
    dispatch(loadMoreVideosThunk(nextPageToken));
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
