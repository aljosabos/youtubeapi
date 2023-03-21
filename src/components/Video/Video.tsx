import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Video.scss";

interface IVideo {
  image: string;
  title: string;
}

export default function Video({ image, title }: IVideo) {
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
            className="Video__content-heading"
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
