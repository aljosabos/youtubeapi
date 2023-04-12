import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { clearLocalStorage } from "../../utils/utils";
import Header from "./Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as googleOAuth from "@react-oauth/google";

describe("Header tests", () => {
  const handleLogout = jest.fn();

  afterEach(() => jest.clearAllMocks());

  test("If the user is logged out, button text is 'Sign in' ", async () => {
    clearLocalStorage();

    renderWithProviders(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Header handleLogout={handleLogout} />
      </GoogleOAuthProvider>
    );

    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeInTheDocument();
  });

  test("click on the button invokes useGoogleLogin method", async () => {
    clearLocalStorage();

    const spyOnLogin = jest.spyOn(googleOAuth, "useGoogleLogin");

    renderWithProviders(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Header handleLogout={handleLogout} />
      </GoogleOAuthProvider>
    );

    const signInButton = screen.getByRole("button", { name: "Sign in" });

    fireEvent.click(signInButton);
    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });
});
