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

const cutStringAfterCharIfCharExists = (string: string, char: string, exception?: string) => {
  if (!string.includes(char) || (exception && string.includes(exception))) return;
  return string.split(char)[0] + char;
};

export const cutDescriptionForPreview = (desc: string, descLength?: number) => {
  if (!desc) return;
  const length = descLength || DEFAULT_DESC_LENGTH;

  const slicedDesc = desc?.split("\n\n")[0].slice(0, length);

  /* cut string even more if includes puncation marks */
  cutStringAfterCharIfCharExists(slicedDesc, "?");
  cutStringAfterCharIfCharExists(slicedDesc, "!");
  cutStringAfterCharIfCharExists(slicedDesc, ".", "https");

  return slicedDesc.endsWith("?") || slicedDesc.endsWith("!") || slicedDesc.endsWith(".") || slicedDesc.includes("https")
    ? slicedDesc
    : `${slicedDesc}...`;
};
