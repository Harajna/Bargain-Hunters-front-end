import Sidebar from "../../components/sidebar/Sidebar";
import Navbar1 from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Items from "../items/Items";


const Home = () => {
  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar1 /> */}
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}

        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
        <Items/>
      </div>
    </div>
  );
};

export default Home;