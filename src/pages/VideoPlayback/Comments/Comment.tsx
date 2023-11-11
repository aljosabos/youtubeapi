import { IComment } from "../../../types/types";
import { translateDateToCurrentLanguage } from "../../../utils/date-utils";
import "./Comment.scss";
import { useImageRender } from "../../../hooks/useImageRender";

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

  const avatarJSXTemplate = (
    <div className="Comment__avatarTemplate">
      <img className="Comment__avatarTemplate-img" />
      <span className="Comment__avatarTemplate-heading">
        {author[0].toUpperCase()}
      </span>
    </div>
  );

  const avatarJSX = <img src={authorImageUrl} className="Comment__avatar" />;

  // if the image link is broken, template image will be shown instead
  const { image: authorImg } = useImageRender(
    authorImageUrl,
    avatarJSX,
    avatarJSXTemplate
  );

  return (
    <div className="Comment">
      {authorImg}

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
