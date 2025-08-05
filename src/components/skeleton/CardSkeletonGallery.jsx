import React from "react";

function CardSkeletonGallery() {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="skeleton h-48 w-full"></div>
      <div className="card-body">
        <div className="skeleton h-6 w-2/3 mb-2"></div>
        <div className="skeleton h-4 w-1/3 mb-2"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-2/4 mb-2"></div>
        <div className="card-actions justify-end">
          <div className="skeleton h-6 w-14"></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeletonGallery;
