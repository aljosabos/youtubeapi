import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

interface IProtectedRouteProps {
  componentForAuthorizedUser: JSX.Element;
  componentForNonAuthorized: JSX.Element;
}

export default function ProtectedRoute({ componentForAuthorizedUser, componentForNonAuthorized }: IProtectedRouteProps) {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) return componentForNonAuthorized;

  return componentForAuthorizedUser;
}
