import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import AdminNav from "../components/AdminNav";
import AuthService from "../api/services/AuthService";

function AdminLayout() {
  // const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // const getUser = async () => {
  //   try {
  //     const res = await AuthService.getUser();
  //     if (res.status === 200) {
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //     } else {
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.error("Auth error:", error);
  //     navigate("/login");
  //   } finally {
  //     setLoading(false);
  //     console.log("Token:", localStorage.getItem("token"));
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <AdminNav>
      <Outlet />
    </AdminNav>
  );
}

export default AdminLayout;
