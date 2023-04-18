import "./Sidebar.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SubscriptionList from "./SubscriptionList/SubscriptionList";
import Drawer from "../../components/Drawer/Drawer";

function Sidebar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="Sidebar">
      {isLoggedIn && (
        <div className="subscriptions-section">
          <SubscriptionList />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
