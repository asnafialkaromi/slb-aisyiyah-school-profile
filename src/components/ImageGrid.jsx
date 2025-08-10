import React from "react";
import { useState } from "react";
import {
  formatDateToIndo,
  formatDateToIndoSimple,
} from "../utils/dateFormatter";
import { useAOS } from "../hooks/useAOS";

function ImageGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  useAOS({ once: false });

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    document.getElementById("modal_detail_gallery").showModal();
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((data, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={index}
            className="mb-2 break-inside-avoid shadow-md hover:shadow-lg transition duration-300 rounded-lg space-y-4 p-4"
          >
            <div className="text-lg font-semibold bg-primary w-fit px-4 py-2 rounded-full mx-auto text-white line-clamp-1">
              {data.title}
            </div>
            <img
              src={data.imageUrl}
              alt={`Gallery ${index + 1}`}
              onClick={() => openModal(data)}
              className="w-full object-cover transform hover:scale-[102%] transition duration-300 rounded-lg cursor-pointer"
            />
            <p>{formatDateToIndoSimple(data.createdAt)}</p>
          </div>
        ))}
      </div>

      <dialog id="modal_detail_gallery" className="modal">
        <div className="modal-box">
          {selectedImage && (
            <>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="object-cover rounded-lg shadow-lg mb-8"
              />
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Kembali</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ImageGrid;
