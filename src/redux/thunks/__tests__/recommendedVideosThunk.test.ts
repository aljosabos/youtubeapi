import { mockAxiosRequests } from "../../../utils/tests.data";
import { store } from "../../store";
import { getRecommendedVideosThunk } from "../recommendedVideosThunk";

describe("recommendedVideosThunk tests", () => {
  beforeAll(() => mockAxiosRequests());

  test("should fetch videos", async () => {
    const results = await store.dispatch(getRecommendedVideosThunk());
  });
});
