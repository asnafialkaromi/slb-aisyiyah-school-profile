import React from "react";
import { Link } from "react-router";
import { formatDateToIndo } from "../utils/dateFormatter";

function AnnonuncementCard(props) {
  const { id, title, description, createdAt, onEdit, isAdminPage } = props;
  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg transition"
      data-aos="fade-up"
    >
      <div className="card-body">
        {/* Title */}
        <div className="card-title text-primary line-clamp-2">{title}</div>

        {/* Date */}
        <p className="text-sm text-base-content/70 mb-2">
          {formatDateToIndo(createdAt)}
        </p>

        {/* Description */}
        <div className="text-sm line-clamp-3">{description}</div>

        {/* Actions */}
        <div className="card-actions mt-4 justify-end">
          {/* If not admin, show "Read More" */}
          {!isAdminPage && (
            <Link
              className="btn btn-sm btn-outline btn-primary"
              to={`/pengumuman/${id}`}
            >
              Baca Selengkapnya
            </Link>
          )}

          {/* If admin, show "Edit" button */}
          {isAdminPage && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                onEdit(id);
                document.getElementById("modal_announcement").showModal();
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnonuncementCard;
