import VideoCard from "../../../components/VideoCard/VideoCard";
import "./RelatedVideos.scss";
import { IVideo } from "../../../types/response";

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
