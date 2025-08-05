import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import AnnouncementService from "../api/services/announcementService";
import { formatDateToIndo } from "../utils/dateFormatter";

function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncementById();
  }, [id]);

  const getAnnouncementById = async () => {
    try {
      const data = await AnnouncementService.getAnnouncementById(id);
      setAnnouncement(data);
      console.log(data);
    } catch (err) {
      console.error("Gagal memuat detail pengumuman:", err);
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

      <div className="card bg-white w-full shadow-sm">
        {announcement?.data?.imageUrl && (
          <figure>
            <img
              src={announcement?.data?.imageUrl}
              alt={announcement?.data?.title}
              className="w-full h-64 object-contain aspect-auto rounded-lg"
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{announcement?.data?.title}</h2>
          <p className="badge badge-primary">
            {formatDateToIndo(announcement?.data?.createdAt)}
          </p>
          <p className="whitespace-pre-line mt-2">
            {announcement?.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
