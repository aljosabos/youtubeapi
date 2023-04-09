import { MutableRefObject } from "react";

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const scrollElementToTop = (
  ref: MutableRefObject<HTMLDivElement | null>,
  behavior?: "smooth" | "auto"
) => {
  if (ref.current) {
    ref.current.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior || "auto",
    });
  }
};

export const scrollPageToTop = () => {
  window.scrollTo(0, 0);
};

export const addBEMClasses = (
  blockName: string,
  elementName?: string,
  modifierName?: string
) => {
  const classList = [blockName];
  if (elementName) classList.push(`__${elementName}`);
  if (elementName && modifierName) classList.push(`--${modifierName}`);

  return classList.join("");
};
