import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Video.scss";

interface IVideo {
  image: string;
  title: string;
  channel: string;
  duration: string;
  views: number;
}

export default function Video({
  image,
  title,
  channel,
  duration,
  views,
}: IVideo) {
  return (
    <div className="Video">
      <Card>
        <CardMedia
          sx={{ height: 100 }}
          image={image}
          title={title}
          className="Video__image"
        />
        <CardContent className="Video__content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="Video__content-title"
          >
            {title}
          </Typography>
          <h5 className="Video__content-channel">{channel}</h5>
          <span className="Video__content-views">{views}K views</span>
          <span className="Video__content-publish-date">4 days ago</span>
        </CardContent>
        <span className="Video__duration">{duration}</span>
      </Card>
    </div>
  );
}
