import React from "react";
import SearchHeader from "./Search-Header";
import Sidebar from "./Sidebar";
import SearchHotel from "./Search-Hotel";
import "../css/Page.css";

const Page = () => {
  return (
    <div className="page-container">
      <SearchHeader />
      <div className="page-content">
        <Sidebar />
        <main className="main-content">
          <SearchHotel />
        </main>
      </div>
    </div>
  );
};

export default Page;
