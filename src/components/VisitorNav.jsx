import React from "react";
import { Link } from "react-router";
import logo from "/logo.png";

export default function VisitorNav() {
  return (
    <div className="navbar fixed bg-white shadow-sm z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pengumuman">Pengumuman</Link>
            </li>
            <li>
              <Link to="/galeri">Galeri</Link>
            </li>
            <li>
              <Link to="/laporan">Laporan</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xs hover:bg-transparent hover:shadow-none hover:text-primary hover:border-none focus:border-none not-focus:border-none"
        >
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          SLB Aisyiyah Al Walidah
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul
          className="menu menu-horizontal px-1"
          style={{
            "--menu-active-bg": "transparent",
            "--menu-active-fg": "var(--color-primary)",
          }}
        >
          <li className="">
            <Link
              to="/"
              className="bg-none hover:bg-transparent hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pengumuman"
              className="bg-none hover:bg-transparent hover:text-primary"
            >
              Pengumuman
            </Link>
          </li>
          <li>
            <Link
              to="/galeri"
              className="bg-none hover:bg-transparent hover:text-primary"
            >
              Galeri
            </Link>
          </li>
          <li>
            <Link
              to="/laporan"
              className="bg-none hover:bg-transparent hover:text-primary"
            >
              Laporan
            </Link>
          </li>
          <li>
            <Link
              to="/kontak"
              className="bg-none hover:bg-transparent hover:text-primary"
            >
              kontak
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <Link to="/login" className="btn btn-primary">
          Login
        </Link> */}
      </div>
    </div>
  );
}
