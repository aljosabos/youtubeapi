import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IVideo {
  id: string;
  title: string;
  channel: string;
  image: string;
  duration: string;
  views: number;
  publishDate: string;
}

export interface IVideoDetails {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
  viewCount: number;
  commentCount: string;
}

export type MaterialIcon = OverridableComponent<
  SvgIconTypeMap<object, "svg">
> & {
  muiName: string;
};
