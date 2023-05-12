import VideoCard from "../../../components/VideoCard/VideoCard";
import { MEDIUM_WIDTH } from "../../../constants/constants";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { IVideo } from "../../../types/types";
import "./RelatedVideos.scss";

interface IRelatedVideosProps {
  videos: IVideo[];
  onClick: (videoId: string) => void;
}

export default function RelatedVideos({ onClick, videos }: IRelatedVideosProps) {
  const { isResized } = useWindowResize(MEDIUM_WIDTH);
  const layout = isResized ? undefined : "horizontal";

  return (
    <div className="RelatedVideos">
      {videos?.map((relatedVideo: IVideo, index) => (
        <VideoCard
          {...relatedVideo}
          onClick={onClick}
          key={index}
          layout={layout}
          className="RelatedVideos__card"
          hideDescription
          disableTextTruncate={!isResized}
        />
      ))}
    </div>
  );
}
