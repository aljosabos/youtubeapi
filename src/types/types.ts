import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";

export type MaterialIcon = OverridableComponent<
  SvgIconTypeMap<object, "svg">
> & {
  muiName: string;
};

export interface IVideo {
  id: string;
  title: string;
  description: string;
  channel: string;
  channelId: string;
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

export interface ISubscription {
  id: string;
  channelId: string;
  title: string;
  image: string;
}

export interface IChannelInfo {
  title: string;
  customUrl: string;
  description: string;
  publishedAt: string;
  image: string;
  subscriberCount: number;
  videoCount: number;
}

export interface IModal {
  open: boolean;
  closeModal: () => void;
  children: ReactNode;
}
