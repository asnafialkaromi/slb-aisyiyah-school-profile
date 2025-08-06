import React from "react";
import { useState, useEffect } from "react";
import { formatDateToIndo } from "../utils/dateFormatter";
import AnnouncementService from "../api/services/announcementService";
import GalleryService from "../api/services/galleryService";
import ReportService from "../api/services/reportService";

function AdminDashboard() {
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [loadingDocumentation, setLoadingDocumentation] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [reports, setReports] = useState([]);
  const [documentation, setDocumentation] = useState([]);

  useEffect(() => {
    getLatestAnnouncements();
    getLatestDocumentations();
    getLatestReports();
  }, []);

  const getLatestAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true);
      const res = await AnnouncementService.getLatestAnnouncement({
        limit: 2,
      });
      setAnnouncements(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const getLatestDocumentations = async () => {
    try {
      setLoadingDocumentation(true);
      const res = await GalleryService.getLatestGallery({
        limit: 2,
      });
      setDocumentation(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDocumentation(false);
    }
  };

  const getLatestReports = async () => {
    try {
      setLoadingReports(true);
      const res = await ReportService.getLatestReport({
        limit: 2,
      });
      setReports(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReports(false);
    }
  };

  const renderCard = (data) => (
    <div
      key={data.id}
      className="bg-white border w-full rounded-lg p-4 shadow-md hover:shadow-lg transition"
    >
      <div className="text-lg font-semibold text-primary mb-1 line-clamp-1">
        {data.title}
      </div>
      <p className="text-sm text-gray-500 mb-1">
        Diupload pada {formatDateToIndo(data.createdAt)}
      </p>
      <p className="text-sm text-gray-600">
        Dibuat oleh <span className="font-medium">{data.admin.name}</span>
      </p>
    </div>
  );

  const Skeleton = () => (
    <div className="bg-white border w-full rounded-lg p-4 shadow-md hover:shadow-lg transition min-h-28">
      <div className="skeleton h-6 w-full mb-1"></div>
      <div className="skeleton h-4 w-2/3 mb-1"></div>
      <div className="skeleton h-4 w-1/3"></div>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Selamat datang di panel admin. Di bawah ini adalah ringkasan aktivitas
        terakhir.
      </p>

      {/* Riwayat Pengumuman */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📢 Riwayat Pengumuman</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center min-h-28">
          {announcements.length === 0 && "Belum ada pengumuman"}
          {loadingAnnouncements && Skeleton()}
          {announcements.map(renderCard)}
        </div>
      </section>

      {/* Riwayat Dokumentasi */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📷 Riwayat Dokumentasi</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center min-h-28">
          {documentation.length === 0 && "Belum ada dokumentasi"}
          {loadingDocumentation && Skeleton()}
          {documentation.map(renderCard)}
        </div>
      </section>

      {/* Riwayat Laporan */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📄 Riwayat Laporan</h2>
        <div className="flex flex-col md:flex-row gap-4  justify-center items-center min-h-28">
          {reports.length === 0 && "Belum ada laporan"}
          {loadingReports && Skeleton()}
          {reports.map(renderCard)}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
