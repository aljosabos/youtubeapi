import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { removeAccessTokenAndExpireTime } from "../../utils/utils";
import Header from "./Header";
import * as googleOAuth from "@react-oauth/google";

describe("Header tests", () => {
  const handleLogout = jest.fn();
  const toggleExpandDrawer = jest.fn();
  afterEach(() => jest.clearAllMocks());

  test("If the user is logged out, button text is 'Sign in'", async () => {
    removeAccessTokenAndExpireTime();
    renderWithProviders(<Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />);

    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeInTheDocument();
  });

  test("click on the button invokes useGoogleLogin method", async () => {
    removeAccessTokenAndExpireTime();
    const spyOnLogin = jest.spyOn(googleOAuth, "useGoogleLogin");
    renderWithProviders(<Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />);

    const btn = screen.getByRole("button", { name: "Sign in" });
    fireEvent.click(btn);
    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });

  test("if the user is logged in, button text is 'Sign out'", async () => {
    renderWithProviders(<Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />, undefined, {
      isLoggedIn: true,
      setIsLoggedIn: jest.fn(),
    });

    const btn = screen.getByRole("button", { name: "Sign out" });
    expect(btn).toBeInTheDocument();
  });

  test("if Sign out button is clicked, handleLogout method is called", async () => {
    renderWithProviders(<Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />, undefined, {
      isLoggedIn: true,
      setIsLoggedIn: jest.fn(),
    });

    const btn = screen.getByRole("button", { name: "Sign out" });
    fireEvent.click(btn);
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  test("click on YouTube logo redirects to home page", () => {
    renderWithProviders(<Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />);

    const logo = screen.getByLabelText("logo");
    fireEvent.click(logo);
    expect(window.location.pathname).toEqual("/");
  });
});
