import { MutableRefObject } from "react";

export const scrollToTop = (ref: MutableRefObject<HTMLDivElement | null>, behavior?: "smooth" | "auto") => {
  if (ref.current)
    ref.current.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior || "auto",
    });
};
