import { useGoogleLogin } from "@react-oauth/google";
import { setTokenExpireTimeToLocalStorage } from "../utils/utils";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { AUTH_SCOPE } from "../constants/endpointConstants";
import { useAppDispatch } from "./reduxHooks";
import { getUserInfoThunk } from "../redux/thunks/userInfoThunk";
import { useNavigate } from "react-router-dom";

export const useLogin = (redirectPath?: string, callback?: () => void) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      setTokenExpireTimeToLocalStorage(access_token, expires_in);
      setIsLoggedIn(true);
      dispatch(getUserInfoThunk(access_token));
      redirectPath && navigate(redirectPath);
      if (callback) callback();
    },
    scope: AUTH_SCOPE,
  });

  return { login, isLoggedIn };
};
