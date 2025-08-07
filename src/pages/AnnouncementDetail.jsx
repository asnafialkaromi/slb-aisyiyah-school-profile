import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import AnnouncementService from "../api/services/announcementService";
import { formatDateToIndo } from "../utils/dateFormatter";
import Toast from "../components/Toast";

function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    getAnnouncementById();
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, [id]);

  const getAnnouncementById = async () => {
    try {
      setLoading(true);
      const data = await AnnouncementService.getAnnouncementById(id);
      setAnnouncement(data);
    } catch (err) {
      setToast({ message: "Gagal mengambil pengumuman.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-12 max-w-7xl min-h-screen mx-auto px-4 flex flex-col items-center">
      <Link
        to="/pengumuman"
        className="btn btn-primary btn-outline mb-6 self-start"
      >
        ← Kembali ke Daftar Pengumuman
      </Link>

      {loading ? (
        <div className="card p-6 bg-white w-full h-fit shadow-sm">
          <div className="skeleton aspect-video w-full mb-4"></div>
          <div className="card-body p-0">
            <div className="skeleton w-full h-8"></div>
            <div className="skeleton w-1/4 h-6"></div>
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-1/3 h-4"></div>
          </div>
        </div>
      ) : !announcement?.data ? (
        <div className="text-center text-base-content mt-10">
          <h2 className="text-xl font-semibold">Pengumuman tidak ditemukan</h2>
          <p className="mt-2 text-sm">Silakan kembali ke daftar pengumuman.</p>
        </div>
      ) : (
        <div className="card bg-white w-full shadow-sm">
          <figure className="p-6 rounded-lg">
            <img
              src={announcement.data.imageUrl}
              alt={announcement.data.title}
              className="w-full h-64 object-contain aspect-auto rounded-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{announcement.data.title}</h2>
            <p className="badge badge-primary">
              {formatDateToIndo(announcement.data.createdAt)}
            </p>
            <p className="whitespace-pre-line mt-2">
              {announcement.data.description}
            </p>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

export default AnnouncementDetail;
