import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  LuMenu,
  LuGauge,
  LuMegaphone,
  LuImages,
  LuFileText,
  LuSchool,
} from "react-icons/lu";
import AuthService from "../api/services/AuthService";

const AdminNav = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const res = await AuthService.getUser();
      if (res.status === true && res.data) {
        setUserName(res.data.user.name);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        {/* Sidebar */}
        <aside
          className={`fixed min-h-screen z-50 top-0 left-0 bg-base-200 p-4 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-64`}
        >
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
            <button
              className="lg:hidden btn btn-sm btn-ghost"
              onClick={toggleSidebar}
            >
              <LuMenu className="w-6 h-6" />
            </button>
          </div>

          <ul className="menu w-full space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <LuGauge /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/pengumuman" className="flex items-center gap-2">
                <LuMegaphone /> Pengumuman
              </Link>
            </li>
            <li>
              <Link to="/admin/galeri" className="flex items-center gap-2">
                <LuImages /> Galeri
              </Link>
            </li>
            <li>
              <Link to="/admin/laporan" className="flex items-center gap-2">
                <LuFileText /> Laporan
              </Link>
            </li>
            <li>
              <Link to="/admin/kelas" className="flex items-center gap-2">
                <LuSchool /> Kelas
              </Link>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              className="btn btn-primary w-full"
              onClick={() =>
                document.getElementById("modal_confirm").showModal()
              }
            >
              Logout
            </Link>
          </div>
        </aside>

        {/* Navbar */}

        {/* Main Content */}
        <div className=" lg:ml-64 mt-16">
          <nav className="fixed w-full top-0 bg-white text-primary py-4 px-10 flex items-center shadow-md z-40">
            <button
              className="lg:hidden btn btn-sm btn-ghost text-black p-0 mr-4"
              onClick={toggleSidebar}
            >
              <LuMenu className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold">Welcome, {userName}</h3>
          </nav>
          {/* Page Content */}
          <main className="p-6 z-10">{children}</main>
        </div>
      </div>
      <dialog id="modal_confirm" className="modal">
        <form method="dialog" className="modal-box min-h-40">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h3 className="font-bold text-lg text-center mt-4">
              Apakah anda yakin ingin Logout?
            </h3>
            <div className="flex w-full gap-4 items-center justify-center">
              <button className="btn btn-error  min-w-20">Tidak</button>
              <button
                className="btn btn-primary min-w-20"
                onClick={handleConfirmLogout}
              >
                Ya
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AdminNav;
