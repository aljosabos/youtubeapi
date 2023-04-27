import Box from "@mui/material/Box";
import MaterialDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import "./Drawer.scss";
import SettingsIcon from "@mui/icons-material/Settings";

import { UserContext } from "../../context/UserContext";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import SubscriptionList from "./SubscriptionList/SubscriptionList";
import SettingsPopover from "../Header/SettingsPopover/SettingsPopover";
import { useWindowResize } from "../../redux/hooks/useWindowResize";
import { X_LARGE_WIDTH } from "../../constants/constants";
import { useAppSelector } from "../../redux/hooks/hooks";
import { userInfoSelector } from "../../redux/slices/userInfoSlice";

interface IDrawerProps {
  shouldExpandDrawer: boolean;
}

export default function Drawer({ shouldExpandDrawer }: IDrawerProps) {
  const navigate = useNavigate();
  const { username, userAvatar } = useAppSelector(userInfoSelector);
  const { isLoggedIn } = useContext(UserContext);
  const modifier = shouldExpandDrawer ? "--expanded" : "";
  const { isResized } = useWindowResize(X_LARGE_WIDTH);

  const navigateToHome = () => {
    navigate("/");
  };

  const listItems = [
    {
      text: "Home",
      icon: (
        <span onClick={navigateToHome} className={`Drawer__list-item-icon-home${modifier}`}>
          <HomeIcon />
        </span>
      ),
    },
    { text: "Subscriptions", icon: <SubscriptionsIcon /> },
  ];

  if (isResized)
    listItems.push({
      text: "Settings",
      icon: <SettingsPopover icon={SettingsIcon} username={username} userAvatar={userAvatar} isLoggedIn={isLoggedIn} />,
    });

  const list = () => (
    <Box role="presentation">
      <List className="Drawer__list">
        {listItems.map(({ text, icon }) => (
          <ListItem key={text} className="Drawer__list-item">
            <ListItemButton className={`Drawer__list-item-button${modifier}`}>
              <ListItemIcon className={`Drawer__list-item-icon${modifier}`}>{icon}</ListItemIcon>
              <ListItemText primary={text} className={`Drawer__list-item-text${modifier}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const rootClass = shouldExpandDrawer ? "Drawer--expanded" : "Drawer";

  return (
    <div>
      <MaterialDrawer disableEnforceFocus anchor="left" open={true} className={rootClass}>
        {list()}
        {isLoggedIn && shouldExpandDrawer && (
          <div className="Subscriptions-section">
            <SubscriptionList />
          </div>
        )}
      </MaterialDrawer>
    </div>
  );
}
