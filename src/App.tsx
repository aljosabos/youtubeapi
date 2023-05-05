import { Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import VideoPlayback from "./pages/VideoPlayback/VideoPlayback";
import VideoSearch from "./pages/VideoSearch/VideoSearch";
import "./axiosInstance/interceptor";
import Channels from "./pages/Channel/Channel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="video/:videoId" element={<VideoPlayback />} />
        {["videos", "/"].map((path, index) => (
          <Route path={path} key={index} element={<Home />} />
        ))}
        <Route path="results" element={<VideoSearch />} />
        <Route path="channel/:channelId" element={<Channels />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
