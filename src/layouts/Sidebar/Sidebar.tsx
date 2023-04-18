import "./Sidebar.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SubscriptionList from "./SubscriptionList/SubscriptionList";

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
