import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import VideoStream from "./components/VideoStream/VideoStream";
import Dashboard from "./layouts/Dashboard/Dashboard";
import Home from "./pages/Home/Videos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="video" element={<VideoStream />} />
        {["/videos", "/"].map((path, index) => (
          <Route path={path} key={index} element={<Home />} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
