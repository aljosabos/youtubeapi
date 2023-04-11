import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { mockAxiosRequests } from "../../utils/tests.data";
import Home from "./Home";
import { getMoreRecommendedVideosThunk, getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";
import * as reduxHooks from "../../redux/hooks/hooks";

describe("Home page tests", () => {
  beforeAll(() => {
    mockAxiosRequests();
  });

  test("should load initial recommended videos", async () => {
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await (store.dispatch as any)(getRecommendedVideosThunk());
    });

    const state = await store.getState().recommendedVideos;

    const cards = await screen.findAllByLabelText("video-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  test("should dispatch load more thunk when page is scrolled", async () => {
    const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await (store.dispatch as any)(getRecommendedVideosThunk());
    });

    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));

    expect(mockedDispatch).toHaveBeenCalled();
  });

  test.only("getMoreRecommendedVideosThunk should return results", async () => {
    /* first  initial videos are loaded */
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await (store.dispatch as any)(getRecommendedVideosThunk());

      /* get nextPageToken for next getMoreVideosThunk */
      const nextPageToken = await store.getState().recommendedVideos.data.nextPageToken;
      /* get more videos */
      await (store.dispatch as any)(getMoreRecommendedVideosThunk(nextPageToken));
    });

    const state = await store.getState().recommendedVideos.data;
    console.log(state);
  });
}); // describe end
