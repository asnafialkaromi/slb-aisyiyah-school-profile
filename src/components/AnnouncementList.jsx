import React from "react";
import { formatDateToIndo } from "../utils/dateFormatter";
import { Link, useLocation } from "react-router";
import { useAOS } from "../hooks/useAOS";

const AnnouncementList = ({ announcements, onEdit }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  useAOS({ once: false });

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements?.map((data, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={index}
            className="card bg-white shadow-md hover:shadow-lg transition mb-4 w-full"
          >
            <div className="card-body">
              <div className="card-title text-black line-clamp-2">
                {data.title}
              </div>
              <p className="text-sm text-base-content/70 mb-2">
                {formatDateToIndo(data.createdAt)}
              </p>
              <div className="text-sm line-clamp-3">{data.description}</div>
              <div className="card-actions mt-4 justify-end">
                {!isAdminPage && (
                  <Link
                    className="btn btn-sm btn-outline btn-primary"
                    to={`/pengumuman/${data.id}`}
                  >
                    Baca Selengkapnya
                  </Link>
                )}
                {isAdminPage && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      onEdit(data.id);
                      document.getElementById("modal_announcement").showModal();
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnnouncementList;
