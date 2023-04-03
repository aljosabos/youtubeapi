import VideoCard from "../../../components/Video/VideoCard";
import "./VideoSuggestions.scss";

export default function VideoSuggestions() {
  const content = [];

  const props = {
    id: "1",
    title: "Title",
    image: "https://cdn.pixabay.com/photo/2015/06/28/11/25/climbing-824373_960_720.jpg",
    channel: "Channel",
    duration: "11:25",
    views: 55,
    publishDate: "3 days ago",
    onClick: () => {
      console.log("hello");
    },
  };

  for (let i = 0; i < 30; i++) {
    content.push(<VideoCard {...props} key={i} cardDirection="row" />);
  }
  return <div className="VideoSuggestions">{content} </div>;
}
