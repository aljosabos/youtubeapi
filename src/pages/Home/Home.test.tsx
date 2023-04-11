import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { mockAxiosRequests } from "../../utils/tests.data";
import Home from "./Home";
import { getMoreRecommendedVideosThunk, getRecommendedVideosThunk } from "../../redux/thunks/recommendedVideosThunk";
import * as reduxHooks from "../../redux/hooks/hooks";
import { recommendedVideosMock } from "../../utils/recommendedVideosMock";
import { mapResponseToVideos } from "../../utils/responseUtils";
import { IVideo } from "../../types/types";

const { items: mockVideos } = recommendedVideosMock.data;

describe("Home page tests", () => {
  beforeAll(() => {
    mockAxiosRequests();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("recommendedVideosThunk returns initial videos", async () => {
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      const response = await store.dispatch(getRecommendedVideosThunk() as any);
      expect(response.payload.items).toEqual(mockVideos);
    });
  });

  test("recommended videos are displayed on the page", async () => {
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await store.dispatch(getRecommendedVideosThunk() as any);
    });

    const cards = await screen.findAllByLabelText("video-card");
    expect(cards).toHaveLength(mockVideos.length);

    const cardTitlesInStore = await store.getState().recommendedVideos.data.items.map(({ title }: IVideo) => title);

    cardTitlesInStore.map(async (title: string) => {
      const cardTitle = await screen.findByText(title);
      expect(cardTitle).toBeInTheDocument();
    });
  });

  test("Recommended videos in redux slice are mapped with mapResponseToVideos function", async () => {
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await store.dispatch(getRecommendedVideosThunk() as any);
    });

    const cardsFromStore = store.getState().recommendedVideos.data.items;
    expect(cardsFromStore).toEqual(mapResponseToVideos(mockVideos));
  });

  test("should dispatch load more thunk when page is scrolled", async () => {
    const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      store.dispatch(getRecommendedVideosThunk() as any);
    });
    /* few page scrolls are neccessary to load more videos */
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));
    fireEvent.scroll(screen.getByTestId("infinite-scroll"));

    expect(mockedDispatch).toHaveBeenCalled();
  });

  test("getMoreRecommendedVideosThunk should return results and add them to intial results", async () => {
    /* before loading more videos, initial load is called */
    const { store } = renderWithProviders(<Home />);
    await act(async () => {
      await store.dispatch(getRecommendedVideosThunk() as any);

      const nextPageToken = await store.getState().recommendedVideos.data.nextPageToken;

      await store.dispatch(getMoreRecommendedVideosThunk(nextPageToken) as any);
    });
  });
});
