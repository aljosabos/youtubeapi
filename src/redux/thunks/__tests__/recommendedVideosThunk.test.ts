import { getRecommendedVideosMockResponse } from "../../../utils/tests.data";
import { store } from "../../store";
import { getRecommendedVideosThunk } from "../recommendedVideosThunk";

describe("recommendedVideosThunk tests", () => {
  beforeAll(() => getRecommendedVideosMockResponse());

  test("should fetch videos", async () => {
    const results = await store.dispatch(getRecommendedVideosThunk());
  });
});
