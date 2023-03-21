import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import { IVideoMappedResponse, IVideoResponse } from "../../types/response";
import { mapResponseToVideos } from "../../utils/responseHelpers";
import "./Home.scss";

export default function Home() {
  const [videos, setVideos] = useState<IVideoMappedResponse[]>([]);

  const fetchVideos = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const mappedVideos = response.data.items.map((item: IVideoResponse) => {
          return mapResponseToVideos(item);
        });
        console.log(mappedVideos);
        if (mappedVideos) setVideos(mappedVideos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="Home">
      {videos.map(({ image, title, id }) => (
        <Video image={image} title={title} key={id} />
      ))}
    </div>
  );
}
