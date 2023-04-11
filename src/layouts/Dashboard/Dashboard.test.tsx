import { GoogleOAuthProvider } from "@react-oauth/google";
import { TOKEN_EXPIRE_TIME } from "../../constants/constants";
import { renderWithProviders } from "../../utils/test-utils";
import Dashboard from "./Dashboard";
import * as googleOAuth from "@react-oauth/google";
import { act } from "react-dom/test-utils";
import { clearLocalStorage } from "../../utils/utils";
import { screen } from "@testing-library/react";

describe("Dashboard tests", () => {
  test("if token is expired, the user will be log out ", async () => {
    const currentTime = Date.now();
    const tokenExpireTime = currentTime;
    localStorage.setItem(TOKEN_EXPIRE_TIME, tokenExpireTime.toString());

    const googleLogoutSpy = jest.spyOn(googleOAuth, "googleLogout");

    renderWithProviders(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Dashboard />
      </GoogleOAuthProvider>
    );
    const mockLocation = { pathname: "/videos" };

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: jest.fn(() => mockLocation),
    }));

    await act(async () => {
      mockLocation.pathname = "/new-route";
      expect(googleLogoutSpy).toHaveBeenCalled();
    });
  });

  test("if the user is logged out, button text is 'Sign in' ", async () => {
    clearLocalStorage();

    renderWithProviders(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Dashboard />
      </GoogleOAuthProvider>
    );

    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeInTheDocument();
  });
}); // subscribe
