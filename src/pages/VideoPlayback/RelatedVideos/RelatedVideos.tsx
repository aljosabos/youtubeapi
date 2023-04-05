import VideoCard from "../../../components/Video/VideoCard";
import "./RelatedVideos.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { relatedVideosSelector } from "../../../redux/slices/relatedVideosSlice";
import { IVideo } from "../../../types/response";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getRelatedVideosThunk } from "../../../redux/thunks/relatedVideosThunk";
import { videosSelector } from "../../../redux/slices/videosSlice";

interface IRelatedVideosProps {
  videoId: string;
}

export default function RelatedVideos({ videoId }: IRelatedVideosProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const relatedVideos = useAppSelector(relatedVideosSelector);
  const popularVideos = useAppSelector(videosSelector);

  /* real use case is commented out since the related videos endpoint uses lot of quota (100 per call out from 10000), instead to display videos popular videos are used since they use quota of only 1 unit */

  // useEffect(() => {
  //   if (videoId) dispatch(getRelatedVideosThunk(videoId));
  // }, [videoId]);

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };
  return (
    <div className="RelatedVideos">
      {popularVideos?.map((relatedVideo: IVideo, index) => (
        <VideoCard {...relatedVideo} onClick={openVideoURL} key={index} layout="horizontal" />
      ))}
    </div>
  );
}
