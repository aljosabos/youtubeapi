import { ReactNode, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Home from "../../pages/Home/Home";
import { Navigate } from "react-router-dom";
import { JsxElement } from "typescript";

interface IProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
}
