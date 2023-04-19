import Box from "@mui/material/Box";
import MaterialDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import "./Drawer.scss";

import { UserContext } from "../../context/UserContext";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import SubscriptionList from "./SubscriptionList/SubscriptionList";

interface IDrawerProps {
  shouldExpandDrawer: boolean;
}

export default function Drawer({ shouldExpandDrawer }: IDrawerProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const expanded = shouldExpandDrawer ? "--expanded" : "";

  const navigateToHome = () => {
    navigate("/");
  };

  const list = () => (
    <Box role="presentation">
      <List className="Drawer__list">
        {["Home", "Subscriptions"].map((text, index) => (
          <ListItem key={text} className="Drawer__list-item">
            <ListItemButton className={`Drawer__list-item-button${expanded}`}>
              <ListItemIcon className={`Drawer__list-item-icon${expanded}`}>
                {index % 2 === 0 ? (
                  <span onClick={navigateToHome} className={`Drawer__list-item-icon-home${expanded}`}>
                    <HomeIcon />
                  </span>
                ) : (
                  <SubscriptionsIcon />
                )}
              </ListItemIcon>
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
