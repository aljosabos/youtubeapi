import InfiniteScroll from "react-infinite-scroll-component";
import ChannelInfo from "../../components/ChannelInfo/ChannelInfo";
import "./Channel.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useNavigate, useParams } from "react-router-dom";
import { IVideo } from "../../types/types";
import { useEffect } from "react";
import { getChannelInfoThunk } from "../../redux/thunks/channelInfoThunk";
import { channelSelector } from "../../redux/slices/channelSlice";
import { IChannelVideosThunkParams, getChannelVideosThunk, getMoreChannelVideosThunk } from "../../redux/thunks/channelVideosThunk";
import { recommendedVideosSelector } from "../../redux/slices/recommendedVideosSlice";
import { getMoreRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";

export default function Channel() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { channelId } = useParams();

  const { channelVideos, channelInfo, nextPageToken } = useAppSelector(channelSelector);

  const { recommendedVideos } = useAppSelector(recommendedVideosSelector);

  const loadMoreVideos = () => {
    if (channelId) {
      const params: IChannelVideosThunkParams = { channelId: channelId, nextPageToken };

      // dispatch(getMoreChannelVideosThunk(params));
      dispatch(getMoreRecommendedVideosThunk(nextPageToken));
    }
  };

  const openVideoURL = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    if (channelId) {
      dispatch(getChannelInfoThunk(channelId));
      // dispatch(getChannelVideosThunk(channelId));
    }
  }, [channelId]);

  return (
    <div className="Channel">
      <ChannelInfo {...channelInfo} />

      <div data-testid="infinite-scroll">
        <InfiniteScroll
          className="Channel__wrapper"
          dataLength={recommendedVideos.length}
          next={loadMoreVideos}
          hasMore={!!nextPageToken}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {recommendedVideos?.map((video: IVideo, index) => (
            <VideoCard ariaLabel="video-card" {...video} key={index} onClick={() => openVideoURL(video.id)} hideDescription />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
