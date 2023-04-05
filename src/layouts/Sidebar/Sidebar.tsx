import "./Sidebar.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import SubscriptionList from "./SubscriptionList/SubscriptionList";

function Sidebar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="Sidebar">
      <Link to="/" className="Sidebar__link">
        Home
      </Link>
      {isLoggedIn && (
        <div className="subscriptions-section">
          <SubscriptionList />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
