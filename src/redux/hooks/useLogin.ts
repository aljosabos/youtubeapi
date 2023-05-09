import { useGoogleLogin } from "@react-oauth/google";
import { setTokenExpireTimeToLocalStorage } from "../../utils/utils";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AUTH_SCOPE } from "../../constants/endpointConstants";
import { useAppDispatch } from "./hooks";
import { getUserInfoThunk } from "../thunks/userInfoThunk";

export const useLogin = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      setTokenExpireTimeToLocalStorage(access_token, expires_in);
      setIsLoggedIn(true);
      dispatch(getUserInfoThunk(access_token));
    },
    scope: AUTH_SCOPE,
  });

  return { login, isLoggedIn };
};
