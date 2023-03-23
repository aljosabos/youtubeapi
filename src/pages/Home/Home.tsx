import axios from "axios";
import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import { IVideoResponse } from "../../types/response";
import {
  formatISOtoHumanReadable,
  formatNumToThousands,
} from "../../utils/dateHelpers";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  INITIAL_LOAD_ENDPOINT,
  INITIAL_LOAD_SIZE,
  LOAD_MORE_SIZE,
} from "../../data/constants";

export default function Home() {
  const [videos, setVideos] = useState<IVideoResponse[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");

  const loadInitialVideos = async () => {
    try {
      const response = await axios.get(INITIAL_LOAD_ENDPOINT);
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreVideos = async () => {
    const LOAD_MORE_ENDPOINT =
      `${INITIAL_LOAD_ENDPOINT}&pageToken=${nextPageToken}`.replace(
        `maxResults=${INITIAL_LOAD_SIZE}`,
        `maxResults=${LOAD_MORE_SIZE}`
      );

    try {
      const response = await axios.get(LOAD_MORE_ENDPOINT);
      setVideos((currentState) => [...currentState, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInitialVideos();
  }, []);

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
        />
      ))}
    </InfiniteScroll>
  );
}
