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
  const maxResults = 50;
  const [videos, setVideos] = useState<IVideoResponse[]>([]);

  // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=${process.env.REACT_APP_API_KEY}

  const fetchVideos = async () => {
    try {
      const videos = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&fields=items(id,contentDetails(duration),snippet(title,channelTitle,publishedAt,thumbnails(high(url))),statistics(viewCount)),nextPageToken&maxResults=${maxResults}&key=${process.env.REACT_APP_API_KEY}`
      );
      console.log(videos.data);
      if (videos) setVideos(videos.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const mockFetch = () => {
    console.log("hey");
  };

  return (
    <InfiniteScroll
      scrollableTarget="scrollable_home"
      dataLength={50}
      next={mockFetch}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className="Home" id="scrollable_home">
        {videos.map((video: IVideoResponse) => (
          <Video
            key={video.id}
            title={video.snippet.title}
            channel={video.snippet.channelTitle}
            image={video.snippet.thumbnails.high.url}
            duration={formatISOtoHumanReadable(video.contentDetails.duration)}
            views={formatToThousands(Number(video.statistics.viewCount))}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
