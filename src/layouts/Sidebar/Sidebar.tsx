import "./Sidebar.scss";
import Subscriptions from "./Subscriptions/Subscriptions";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="subscriptions-section">
        <Subscriptions />
      </div>
    </div>
  );
}

export default Sidebar;
