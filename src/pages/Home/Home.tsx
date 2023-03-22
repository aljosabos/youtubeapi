import axios from "axios";
import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import { IVideoResponse } from "../../types/response";
import {
  formatISOtoHumanReadable,
  formatToThousands,
} from "../../utils/dateHelpers";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const maxResults = 16;
  const [videos, setVideos] = useState<IVideoResponse[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  // let nextPageToken = "";
  // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=${process.env.REACT_APP_API_KEY}

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&maxResults=${maxResults}&pageToken=${nextPageToken}&key=${process.env.REACT_APP_API_KEY}`
      );
      if (response) {
        setVideos((current) => [...current, ...response.data.items]);
        setNextPageToken(response.data.nextPageToken);
        // nextPageToken = response.data.nextPageToken;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  console.log(videos);

  console.log(nextPageToken);

  return (
    <InfiniteScroll
      scrollableTarget="scrollable"
      dataLength={videos.length}
      next={fetchVideos}
      hasMore={videos.length < 500}
      loader={<h4>Loading...</h4>}
      className="Home"
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {/* <div className="Home" id="scrollable"> */}
      {videos.map((video: IVideoResponse, index) => (
        <Video
          key={index}
          title={video.snippet.title}
          channel={video.snippet.channelTitle}
          image={video.snippet.thumbnails.high.url}
          duration={formatISOtoHumanReadable(video.contentDetails.duration)}
          views={formatToThousands(Number(video.statistics.viewCount))}
        />
      ))}
      {/* </div> */}
    </InfiniteScroll>
  );
}
