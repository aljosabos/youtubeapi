import "./Sidebar.scss";
import Subscriptions from "./Subscriptions/Subscriptions";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Sidebar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="Sidebar">
      {isLoggedIn && (
        <div className="subscriptions-section">
          <Subscriptions />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
