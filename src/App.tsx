import { Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import VideoPlayback from "./pages/VideoPlayback/VideoPlayback";
import VideoSearch from "./pages/VideoSearch/VideoSearch";
import "./axiosInstance/interceptor";
import Channels from "./pages/Channel/Channel";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import LoginDialogBox from "./components/LoginDialogBox/LoginDialogBox";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="video/:videoId" element={<VideoPlayback />} />
        {["videos", "/"].map((path, index) => (
          <Route path={path} key={index} element={<Home />} />
        ))}
        <Route path="results" element={<VideoSearch />} />
        <Route path="channel/:channelId" element={<Channels />} />

        <Route
          path="subscriptions"
          element={
            <ProtectedRoute
              componentForAuthorizedUser={<Subscriptions />}
              componentForNonAuthorized={
                <LoginDialogBox
                  icon={VideoLibraryIcon}
                  title={t("dialogBox.login.large.title")}
                  text={t("dialogBox.login.large.text")}
                  centerDialogBox
                  disableShadow
                />
              }
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
