import React from "react";
import { formatDateToIndo } from "../utils/dateFormatter";
import { Link, useLocation } from "react-router";
import { useAOS } from "../hooks/useAOS";

function ReportList({ onEdit, reports, loading }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  useAOS({ once: false });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((data, index) => (
        <div
          data-aos="fade-up"
          data-aos-delay={index * 100}
          key={index}
          className="card bg-base-200 shadow-md hover:shadow-lg transition"
        >
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p className="text-sm text-gray-500">
              {formatDateToIndo(data.createdAt)}
            </p>
            <div className="line-clamp-3 text-sm">{data.description}</div>
            <p className="text-xs text-gray-400">
              Sumber Dana: {data.fundingSource}
            </p>
            <div className="card-actions justify-end mt-4">
              {!isAdminPage ? (
                <Link
                  className="btn btn-sm btn-outline btn-primary"
                  to={`/laporan/${data.id}`}
                >
                  Baca Selengkapnya
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    onEdit(data.id);
                    document.getElementById("modal_report").showModal();
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
  );
}

export default ReportList;
