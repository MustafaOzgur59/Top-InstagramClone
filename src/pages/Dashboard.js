import React, { useContext } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import UserContext from "../context/user";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline className="col-span-2" />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
