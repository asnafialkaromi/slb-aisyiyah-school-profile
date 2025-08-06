import React from "react";
import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TbError404 className="text-9xl text-primary" />
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p className="text-lg">Halaman yang Anda cari tidak ditemukan</p>
    </div>
  );
}

export default NotFound;
