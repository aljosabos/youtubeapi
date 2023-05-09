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
import { ReactNode } from "react";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useLogin } from "../../redux/hooks/useLogin";
import Button from "../../components/Button/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface IDrawerProps {
  shouldExpandDrawer: boolean;
}

export default function Drawer({ shouldExpandDrawer }: IDrawerProps) {
  const navigate = useNavigate();
  const { username, userAvatar } = useAppSelector(userInfoSelector);
  const { isLoggedIn } = useContext(UserContext);
  const modifier = shouldExpandDrawer ? "--expanded" : "";
  const rootClass = shouldExpandDrawer ? "Drawer--expanded" : "Drawer";
  const { isResized } = useWindowResize(X_LARGE_WIDTH);
  const { login } = useLogin("/subscriptions");

  interface IListItem {
    text: string;
    icon: ReactNode;
    path?: string;
  }

  const listItems: IListItem[] = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    { text: "Subscriptions", icon: <SubscriptionsIcon />, path: "subscriptions" },
  ];

  if (isResized)
    listItems.push({
      text: "Settings",
      icon: <SettingsPopover icon={SettingsIcon} username={username} userAvatar={userAvatar} isLoggedIn={isLoggedIn} />,
    });

  const list = () => (
    <Box role="presentation">
      <List className="Drawer__list">
        {listItems.map(({ text, icon, path }) => (
          <ListItem key={text} className="Drawer__list-item" onClick={() => path && navigate(path)}>
            <ListItemButton className={`Drawer__list-item-button${modifier}`}>
              <ListItemIcon className={`Drawer__list-item-icon${modifier}`}>{icon}</ListItemIcon>
              <ListItemText primary={text} className={`Drawer__list-item-text${modifier}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <MaterialDrawer disableEnforceFocus anchor="left" open={true} className={rootClass}>
        {list()}
        {isLoggedIn && shouldExpandDrawer && (
          <div className="Subscriptions-section">
            <SubscriptionList />
          </div>
        )}
        {!isLoggedIn && shouldExpandDrawer && (
          <DialogBox
            text="Sign in to like videos, comment, and subscribe."
            btn={<Button text="Sign in" startIcon={AccountCircleIcon} onClick={login} variant="outlined" />}
            wrapperClassName="Drawer__dialogBox"
          />
        )}
      </MaterialDrawer>
    </div>
  );
}
