import Box from "@mui/material/Box";
import MaterialDrawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import Button from "../Button/Button";
import "./Drawer.scss";

export default function Drawer() {
  const anchor = "anchor";
  const [shouldExpandDrawer, setShouldExpandDrawer] = useState<boolean>(false);

  const toggleExpandDrawer = () => {
    // if ("key" in event) {
    //   if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
    //     return;
    //   }
    // }

    setShouldExpandDrawer((previousState) => !previousState);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log(event.key);
    if (event.key === "Enter") setShouldExpandDrawer(true);
  };

  const list = () => (
    <Box role="presentation">
      <Button text="Click me" onClick={toggleExpandDrawer} />
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleExpandDrawer}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              {shouldExpandDrawer && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="Drawer">
      <MaterialDrawer anchor="left" open={true}>
        {list()}
      </MaterialDrawer>
    </div>
  );
}
