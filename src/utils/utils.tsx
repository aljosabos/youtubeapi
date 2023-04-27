import { MutableRefObject } from "react";
import { ACCESS_TOKEN, TOKEN_EXPIRE_TIME } from "../constants/constants";
import { createElement } from "react";
import { MaterialIcon } from "../types/types";

export const removeAccessTokenAndExpireTime = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_EXPIRE_TIME);
};

export const setTokenExpireTimeToLocalStorage = (accessToken: string, tokenExpiresIn: number) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  const tokenExpireTime = Date.now() + tokenExpiresIn * 1000;
  localStorage.setItem(TOKEN_EXPIRE_TIME, tokenExpireTime.toString());
};

export const scrollElementToTop = (ref: MutableRefObject<HTMLDivElement | null>, behavior?: "smooth" | "auto") => {
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

export const addBEMClasses = (blockName: string, elementName?: string, modifierName?: string) => {
  const classList = [blockName];
  if (elementName) classList.push(`__${elementName}`);
  if (elementName && modifierName) classList.push(`--${modifierName}`);

  return classList.join("");
};

export interface IIconStyles {
  [key: string]: string | number;
}

export const renderIconBasedOnType = (icon: MaterialIcon | string) =>
  typeof icon === "string" ? <img src={icon} alt="Icon" className="Button__Icon" /> : createElement(icon, { className: "Icon" });

export const formatDescriptionForPreview = (desc: string, descLength?: number) => {
  if (!desc) return;

  const formattedDescription = desc?.split("\n\n")[0].slice(0, descLength || 160);

  if (formattedDescription.includes("?")) return formattedDescription.split("?")[0] + "?";

  if (formattedDescription.includes("!")) return formattedDescription.split("!")[0] + "!";

  if (formattedDescription.includes(".") && !formattedDescription.includes("https")) return formattedDescription.split(".")[0] + ".";

  return formattedDescription.endsWith("?") ||
    formattedDescription.endsWith("!") ||
    formattedDescription.endsWith(".") ||
    formattedDescription.includes("https")
    ? formattedDescription
    : `${formattedDescription}...`;
};
