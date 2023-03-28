import "./Sidebar.scss";
import Subscriptions from "./Subscriptions/Subscriptions";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="Sidebar">
      <Link to="/" className = "Sidebar__link">Home</Link>
      {isLoggedIn && (
        <div className="subscriptions-section">
          <Subscriptions />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
