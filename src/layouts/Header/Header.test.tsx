import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { clearLocalStorage } from "../../utils/utils";
import Header from "./Header";
import * as googleOAuth from "@react-oauth/google";

describe("Header tests", () => {
  const handleLogout = jest.fn();

  afterEach(() => jest.clearAllMocks());

  test("If the user is logged out, button text is 'Sign in' ", async () => {
    clearLocalStorage();

    renderWithProviders(<Header handleLogout={handleLogout} />);

    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeInTheDocument();
  });

  test("click on the button invokes useGoogleLogin method", async () => {
    clearLocalStorage();

    const spyOnLogin = jest.spyOn(googleOAuth, "useGoogleLogin");

    renderWithProviders(<Header handleLogout={handleLogout} />);

    const btn = screen.getByRole("button", { name: "Sign in" });

    fireEvent.click(btn);
    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });

  test("if the user is logged in, button text is 'Sign out' ", async () => {
    renderWithProviders(<Header handleLogout={handleLogout} />, undefined, { isLoggedIn: true, setIsLoggedIn: jest.fn() });

    const btn = screen.getByRole("button", { name: "Sign out" });
    expect(btn).toBeInTheDocument();
  });

  test("if Sign out button is clicked, handleLogout method is called", async () => {
    renderWithProviders(<Header handleLogout={handleLogout} />, undefined, { isLoggedIn: true, setIsLoggedIn: jest.fn() });

    const btn = screen.getByRole("button", { name: "Sign out" });
    fireEvent.click(btn);
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  test("click on YouTube logo redirects to home page", () => {
    renderWithProviders(<Header handleLogout={handleLogout} />);

    const logo = screen.getByLabelText("logo");
    fireEvent.click(logo);

    expect(window.location.pathname).toEqual("/");
  });
});
