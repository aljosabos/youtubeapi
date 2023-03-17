import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Video.scss";

export default function Video() {
  return (
    <div className="Video">
      <Card>
        <CardMedia
          sx={{ height: 100 }}
          image="https://i.ytimg.com/vi/wHff7sABAvs/hqdefault.jpg?sRUAAIhCGAE=&rs=AOn4CLDoJkJIqUoNSuMjraytDhEFSWrWVw"
          title="video"
          className="Video__image"
        />
        <CardContent className="Video__content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="Video__content-heading"
          >
            video
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
