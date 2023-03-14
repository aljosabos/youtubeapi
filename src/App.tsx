import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./layouts/Dashboard/Dashboard";
import VideoPlayback from "./pages/VideoPlayback/VideoPlayback";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="video:id" element={<VideoPlayback />} />
        {["/videos", "/"].map((path, index) => (
          <Route path={path} key={index} element={<Home />} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
