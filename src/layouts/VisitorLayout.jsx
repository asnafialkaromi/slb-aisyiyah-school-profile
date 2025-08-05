import React from "react";
import { Outlet } from "react-router";
import VisitorNav from "../components/VisitorNav";
import Footer from "../components/Footer";

function VisitorLayout() {
  return (
    <div>
      <VisitorNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default VisitorLayout;
