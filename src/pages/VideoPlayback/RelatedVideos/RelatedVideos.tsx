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

  // useEffect(() => {
  //   if (videoId) dispatch(getRelatedVideosThunk(videoId));
  // }, [videoId]);

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
