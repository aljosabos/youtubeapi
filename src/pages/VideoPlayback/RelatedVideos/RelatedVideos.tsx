import VideoCard from "../../../components/Video/VideoCard";
import "./RelatedVideos.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { relatedVideosSelector } from "../../../redux/slices/relatedVideosSlice";
import { IVideo } from "../../../types/response";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getRelatedVideosThunk } from "../../../redux/thunks/relatedVideosThunk";

interface IRelatedVideosProps {
  videoId: string;
}

export default function RelatedVideos({ videoId }: IRelatedVideosProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const relatedVideos = useAppSelector(relatedVideosSelector);
  // const content = [];

  // const response = axios
  //   .get(
  //     `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=4D_OwIyiTYU&type=video&pageToken&maxResults=30&key=${process.env.REACT_APP_API_KEY}`
  //   )
  //   .then((response) => console.log(response));

  // const props = {
  //   id: "1",
  //   title: "Title",
  //   image: "https://cdn.pixabay.com/photo/2015/06/28/11/25/climbing-824373_960_720.jpg",
  //   channel: "Channel",
  //   duration: "11:25",
  //   views: 55,
  //   publishDate: "3 days ago",
  //   onClick: () => {
  //     console.log("hello");
  //   },
  // };

  // for (let i = 0; i < 30; i++) {
  //   content.push(<VideoCard {...props} key={i} cardDirection="row" />);
  // }

  useEffect(() => {
    if (videoId) dispatch(getRelatedVideosThunk(videoId));
  }, [videoId]);

  console.log(relatedVideos);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };
  return (
    <div className="RelatedVideos">
      {relatedVideos?.map((relatedVideo: IVideo, index) => (
        <VideoCard {...relatedVideo} onClick={openVideoURL} key={index} cardDirection="row" />
      ))}
    </div>
  );
}
