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
import { useWindowResize } from "../../hooks/useWindowResize";
import { X_LARGE_WIDTH } from "../../constants/constants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { userInfoSelector } from "../../redux/slices/userInfoSlice";
import { ReactNode } from "react";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useLogin } from "../../hooks/useLogin";
import Button from "../../components/Button/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import { MaterialIcon } from "../../types/types";

interface IDrawerProps {
  shouldExpandDrawer: boolean;
}

export default function Drawer({ shouldExpandDrawer }: IDrawerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username, userAvatar } = useAppSelector(userInfoSelector);
  const { isLoggedIn } = useContext(UserContext);
  const modifier = shouldExpandDrawer ? "--expanded" : "";
  const rootClass = shouldExpandDrawer ? "Drawer--expanded" : "Drawer";
  const { isResized } = useWindowResize(X_LARGE_WIDTH);
  const { login } = useLogin("/");

  interface IListItem {
    text: string;
    icon: ReactNode;
    path?: string;
  }

  const listItems: IListItem[] = [
    {
      text: t("drawer.listItems.home"),
      icon: <HomeIcon />,
      path: "/",
    },
    { text: t("drawer.listItems.subscriptions"), icon: <SubscriptionsIcon />, path: "subscriptions" },
  ];

  if (isResized)
    listItems.push({
      text: t("drawer.listItems.settings"),
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
            text={t("dialogBox.login.small.text")}
            btn={<Button text={t("dialogBox.login.small.btn")} startIcon={AccountCircleIcon} onClick={login} variant="outlined" />}
            wrapperClassName="Drawer__dialogBox"
          />
        )}
      </MaterialDrawer>
    </div>
  );
}
