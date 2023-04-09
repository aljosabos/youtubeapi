import VideoCard from "../../../components/VideoCard/VideoCard";
import { IVideo } from "../../../types/types";
import "./RelatedVideos.scss";

interface IRelatedVideosProps {
  videos: IVideo[];
  onClick: (videoId: string) => void;
}

export default function RelatedVideos({ onClick, videos }: IRelatedVideosProps) {
  return (
    <div className="RelatedVideos">
      {videos?.map((relatedVideo: IVideo, index) => (
        <VideoCard {...relatedVideo} onClick={onClick} key={index} layout="horizontal" />
      ))}
    </div>
  );
}
