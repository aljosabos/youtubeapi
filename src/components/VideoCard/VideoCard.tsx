import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./VideoCard.scss";

interface IVideoCardProps {
  id: string;
  title: string;
  image: string;
  channel: string;
  duration: string;
  views: number;
  publishDate: string;
  onClick: (id: string) => void;
  layout?: "horizontal";
}

export default function VideoCard({ id, image, title, channel, duration, views, publishDate, onClick, layout }: IVideoCardProps) {
  const addClasses = (className: string) => (layout ? `${className}-horizontal` : className);

  return (
    <div className="VideoCard">
      <Card onClick={() => onClick(id)} className={addClasses("VideoCard__wrapper")}>
        <div className={addClasses("VideoCard__media")}>
          <CardMedia sx={{ height: 100 }} image={image} title={title} className={addClasses("VideoCard__media-image")} />
          <span className={addClasses("VideoCard__media-duration")}>{duration}</span>
        </div>
        <CardContent className={addClasses("VideoCard__content")}>
          <Typography gutterBottom variant="h5" component="div" className="VideoCard__content-title">
            {title}
          </Typography>
          <h5 className="Video__content-channel">{channel}</h5>
          <span className="VideoCard__content-views">{views}K views</span>
          <span className="VideoCard__content-publish-date">{publishDate}</span>
        </CardContent>
      </Card>
    </div>
  );
}
