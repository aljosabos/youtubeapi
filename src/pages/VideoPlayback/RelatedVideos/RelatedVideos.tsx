import VideoCard from "../../../components/Video/VideoCard";
import "./RelatedVideos.scss";
import { IVideo } from "../../../types/response";

interface IRelatedVideosProps {
  relatedVideos: IVideo[];
  onClick: (videoId: string) => void;
}

export default function RelatedVideos({ onClick, relatedVideos }: IRelatedVideosProps) {
  return (
    <div className="RelatedVideos">
      {relatedVideos?.map((relatedVideo: IVideo, index) => (
        <VideoCard {...relatedVideo} onClick={onClick} key={index} layout="horizontal" />
      ))}
    </div>
  );
}
