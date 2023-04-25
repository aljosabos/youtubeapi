import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./VideoCard.scss";
import { addBEMClasses } from "../../utils/utils";

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
  ariaLabel?: string;
  className?: string;
  wrapperClassName?: string;
}

export default function VideoCard({
  id,
  image,
  title,
  channel,
  duration,
  views,
  publishDate,
  onClick,
  layout,
  ariaLabel,
  className,
  wrapperClassName,
}: IVideoCardProps) {
  return (
    <div className={wrapperClassName}>
      <div className={addBEMClasses("VideoCard")} aria-label={ariaLabel}>
        <Card onClick={() => onClick(id)} className={`${addBEMClasses("VideoCard", "wrapper", layout)} ${className}`}>
          <div className={addBEMClasses("VideoCard", "media", layout)}>
            <CardMedia sx={{ height: 100 }} image={image} title={title} className={addBEMClasses("VideoCard", "media-image", layout)} />
            <span className={addBEMClasses("VideoCard", "media-duration", layout)}>{duration}</span>
          </div>
          <CardContent className={addBEMClasses("VideoCard", "content", layout)}>
            <Typography gutterBottom variant="h5" component="div" className="VideoCard__content-title">
              {title}
            </Typography>
            <h5 className="Video__content-channel">{channel}</h5>
            <span className="VideoCard__content-views">{views}K views</span>
            <span className="VideoCard__content-publish-date">{publishDate}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
