import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/Home/Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Header className="Dashboard__header" />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
