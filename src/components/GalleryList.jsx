import React from "react";
import { formatDateToIndo } from "../utils/dateFormatter";

function GalleryList({ onEdit, galleries, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((data, index) => (
        <div
          key={index}
          className="card bg-base-200 shadow-md hover:shadow-lg transition"
        >
          <figure>
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p className="text-sm text-gray-500">
              {formatDateToIndo(data.createdAt)}
            </p>
            <div className="line-clamp-3"> {data.description}</div>
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  onEdit(data.id);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GalleryList;
