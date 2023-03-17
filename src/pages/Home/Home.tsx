import { ReactElement } from "react";
import Video from "../../components/Video/Video";
import "./Home.scss";

export default function Home() {
  const videos: ReactElement[] = [];

  for (let i = 0; i < 40; i++) {
    videos.push(<Video key={i} />);
  }
  return <div className="Home">{videos}</div>;
}
