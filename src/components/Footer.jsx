import React from "react";
import logo from "/logo.png";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">Menu</h6>
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
      <aside>
        <img src={logo} alt="logo SLB Aisyah Al Walidah" className="w-24" />
        <p>
          SLB Aisyiyah Al Walidah
          <br />
          Desa Banjarsari Rt 01 Rw 07 Kec. Ajibarang Kab. Banyumas
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
