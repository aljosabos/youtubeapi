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
  cardDirection?: "row";
}

export default function VideoCard({ id, image, title, channel, duration, views, publishDate, onClick, cardDirection }: IVideoCardProps) {
  return (
    <div className="VideoCard">
      <Card onClick={() => onClick(id)} className={`${cardDirection && `VideoCard__root-${cardDirection}`}`}>
        <div className={cardDirection ? "VideoCard__media-row" : "VideoCard__media"}>
          <CardMedia sx={{ height: 100 }} image={image} title={title} className={`VideoCard__media-image${`-${cardDirection}`}`} />
          <span className={cardDirection ? "VideoCard__duration-row" : "VideoCard__duration"}>{duration}</span>
        </div>
        <CardContent className={`VideoCard__content${`-${cardDirection}`}`}>
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
