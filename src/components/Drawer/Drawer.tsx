import Box from "@mui/material/Box";
import MaterialDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import "./Drawer.scss";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import SubscriptionList from "../../layouts/Sidebar/SubscriptionList/SubscriptionList";
import { UserContext } from "../../context/UserContext";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";

interface IDrawerProps {
  shouldExpandDrawer: boolean;
}

export default function Drawer({ shouldExpandDrawer }: IDrawerProps) {
  const anchor = "anchor";

  const { isLoggedIn } = useContext(UserContext);
  console.log(shouldExpandDrawer);
  const expanded = shouldExpandDrawer ? "--expanded" : "";

  const list = () => (
    <Box role="presentation">
      <List className="Drawer__list">
        {["Home", "Subscriptions"].map((text, index) => (
          <ListItem key={text} className="Drawer__list-item">
            <ListItemButton className={`Drawer__list-item-button${expanded}`}>
              <ListItemIcon className="Drawer__list-item-icon">{index % 2 === 0 ? <HomeIcon /> : <SubscriptionsIcon />}</ListItemIcon>
              <ListItemText primary={text} className={`Drawer__list-item-text${expanded}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider className="Drawer__divider" />

      {isLoggedIn && shouldExpandDrawer && (
        <div className="subscriptions-section">
          <SubscriptionList />
        </div>
      )}
    </Box>
  );

  const rootClass = shouldExpandDrawer ? "Drawer--expanded" : "Drawer";

  return (
    <div>
      <MaterialDrawer anchor="left" open={true} className={rootClass}>
        {list()}
      </MaterialDrawer>
    </div>
  );
}
