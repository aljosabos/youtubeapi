import { ReactNode, useEffect, useState } from "react";

export const useImageRender = (
  url: string,
  imgJSX: ReactNode,
  templateJSX: ReactNode
) => {
  const [image, setImage] = useState<ReactNode | null>(null);

  const img = new Image();
  img.src = url;

  useEffect(() => {
    img.onload = () => setImage(imgJSX);
    img.onerror = () => setImage(templateJSX);
  }, []);

  return { image };
};
