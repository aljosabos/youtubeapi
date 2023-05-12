import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./VideoCard.scss";
import { cutDescriptionForPreview } from "../../utils/utils";
import { translateDateToCurrentLanguage } from "../../utils/date-utils";
import { useTranslation } from "react-i18next";

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
  description: string;
  showDescriptionPreview?: boolean;
  hideDescription?: boolean;
  disableTextTruncate?: boolean;
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
  description,
  hideDescription = false,
  disableTextTruncate = false,
}: IVideoCardProps) {
  const { t } = useTranslation();

  const modifier = layout ? "--horizontal" : "";

  const translatedDate = translateDateToCurrentLanguage(publishDate);

  return (
    <div className={wrapperClassName}>
      <div className="VideoCard" aria-label={ariaLabel}>
        <Card onClick={() => onClick(id)} className={`VideoCard__wrapper${modifier} ${className}`}>
          <div className={`VideoCard__media${modifier}`}>
            <CardMedia sx={{ height: 100 }} image={image} title={title} className={`VideoCard__media-image${modifier}`} />
            <span className={`VideoCard__media-duration${modifier}`}>{duration}</span>
          </div>
          <CardContent className={`VideoCard__content${modifier}`}>
            <Typography gutterBottom variant="h5" component="div">
              <span className="VideoCard__content-title">{title}</span>
              {!hideDescription && <p className="VideoCard__content-description">{cutDescriptionForPreview(description)}</p>}
            </Typography>

            <h5 className="Video__content-channel">{channel}</h5>
            <span className="VideoCard__content-views">
              {views}K {t("videoCard.views")}
            </span>
            <span className="VideoCard__content-publish-date">{translatedDate}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
