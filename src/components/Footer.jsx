import React from "react";
import logo from "/logo.png";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer py-10 px-4 sm:footer-horizontal bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row-reverse items-center md:justify-between gap-14">
        <nav className="flex flex-col w-1/3 text-center md:text-left gap-1">
          <h6 className="footer-title text-lg">Menu</h6>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/pengumuman" className="hover:text-gray-400">
            Pengumuman
          </Link>
          <Link to="/gallery" className="hover:text-gray-400">
            Galeri
          </Link>
          <Link to="/laporan" className="hover:text-gray-400">
            Laporan
          </Link>
          <Link to="/kontak" className="hover:text-gray-400">
            Kontak
          </Link>
        </nav>
        <aside className="flex flex-col md:flex-row w-full md:w-2/3 items-center text-center md:text-left h-full gap-8">
          <img src={logo} alt="logo SLB Aisyah Al Walidah" className="w-24" />
          <p className="text-lg font-semibold">
            SLB Aisyiyah Al Walidah
            <br />
            <span className="text-sm font-normal">
              Desa Banjarsari Rt 01 Rw 07 Kec. Ajibarang Kab. Banyumas{" "}
            </span>
          </p>
        </aside>
      </div>
    </footer>
  );
}

export default Footer;
