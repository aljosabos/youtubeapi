import { IComment } from "../../../types/types";
import { translateDateToCurrentLanguage } from "../../../utils/date-utils";
import "./Comment.scss";

export default function Comment({
  videoId,
  author,
  authorImageUrl,
  text,
  likeCount,
  publishedAt,
  updatedAt,
}: IComment) {
  const publishedAtFormatted = translateDateToCurrentLanguage(publishedAt);

  console.log(authorImageUrl);

  return (
    <div className="Comment">
      {authorImageUrl ? (
        <img src={authorImageUrl} className="Comment__image" />
      ) : (
        <div className="Comment__image">{author[0]}</div>
      )}

      <div className="Comment__wrapper">
        <span className="Comment__wrapper-author">@{author}</span>
        <span className="Comment__wrapper-publishedAt">
          {publishedAtFormatted}
        </span>
        <p className="Comment__wrapper-text">{text}</p>
      </div>
    </div>
  );
}
