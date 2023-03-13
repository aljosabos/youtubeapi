import Sidebar from "../../pages/Home/Sidebar/Sidebar";
import Videos from "../../pages/Home/Videos/Videos";
import Header from "../Header/Header";

function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Videos />
    </div>
  );
}

export default Dashboard;
