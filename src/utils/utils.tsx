import { MutableRefObject } from "react";
import { ACCESS_TOKEN, DEFAULT_DESC_LENGTH, TOKEN_EXPIRE_TIME } from "../constants/constants";
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

export interface IIconStyles {
  [key: string]: string | number;
}

export const renderIconBasedOnType = (icon: MaterialIcon | string, iconClass: string) =>
  typeof icon === "string" ? <img src={icon} alt="Icon" className={iconClass} /> : createElement(icon, { className: iconClass });

const cutStringAfterCharIfCharExists = (string: string, char: string, exception?: string) => {
  if (!string.includes(char) || (exception && string.includes(exception))) return string;
  return string.split(char)[0] + char;
};

export const cutDescriptionForPreview = (desc: string, descLength?: number) => {
  if (!desc) return "";
  const length = descLength || DEFAULT_DESC_LENGTH;

  const slicedDesc = desc.split("\n\n")[0].slice(0, length);
  let slicedDescWithPunctuation = "";
  const punctuationChars = ["?", "!", "."];

  punctuationChars.forEach((char) => {
    slicedDescWithPunctuation = cutStringAfterCharIfCharExists(slicedDesc, char, "https");
  });

  return slicedDescWithPunctuation ? slicedDescWithPunctuation : `${slicedDesc}...`;
};

export const truncateText = (text: string, length?: number) => {
  const size = length || 50;

  if (text.length < size) return;

  return text.substring(0, size) + "...";
};
