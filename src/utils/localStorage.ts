import { ACCESS_TOKEN, TOKEN_EXPIRE_TIME } from "../constants/general";

export const clearLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_EXPIRE_TIME);
};
