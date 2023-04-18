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

  // const toggleExpandDrawer = () => {
  //   // if ("key" in event) {
  //   //   if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
  //   //     return;
  //   //   }
  //   // }

  //   setShouldExpandDrawer((previousState) => !previousState);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  //   console.log(event.key);
  //   if (event.key === "Enter") setShouldExpandDrawer(true);
  // };

  const list = () => (
    <Box role="presentation">
      <List className="Drawer__list">
        {["Home", "Subscriptions"].map((text, index) => (
          <ListItem key={text} className="Drawer__list-item">
            <ListItemButton>
              <ListItemIcon className="Drawer__list-item-icon">{index % 2 === 0 ? <HomeIcon /> : <SubscriptionsIcon />}</ListItemIcon>
              <ListItemText primary={text} className="Drawer__list-item-text" />
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

  return (
    <div>
      <MaterialDrawer anchor="left" open={true} className="Drawer">
        {list()}
        {/* <Sidebar /> */}
      </MaterialDrawer>
    </div>
  );
}
