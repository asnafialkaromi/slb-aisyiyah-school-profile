import React from "react";
import { formatDateToIndo } from "../utils/dateFormatter";
import { useAOS } from "../hooks/useAOS";

function ImageGrid({ images }) {
  useAOS({ once: false });

  return (
    <div className="max-w-7xl mx-auto text-center">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-2">
        {images.map((data, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={index}
            className="mb-2 break-inside-avoid shadow-md hover:shadow-lg transition duration-300 rounded-lg"
          >
            <img
              src={data.imageUrl}
              alt={`Gallery ${index + 1}`}
              onClick={() =>
                document.getElementById("modal_detail_gallery").showModal()
              }
              className="w-full object-cover transform hover:scale-[102%] transition duration-300 rounded-lg"
            />
          </div>
        ))}
      </div>
      <dialog id="modal_detail_gallery" className="modal">
        <div className="modal-box">
          <img
            src={images[0]?.imageUrl}
            alt={images[0]?.title}
            className="w-full object-cover rounded-lg shadow-lg mb-8"
          />
          <h3 className="font-bold text-lg mb-2 bg-primary rounded-full text-white w-fit mx-auto px-4 py-2">
            {images[0]?.title}
          </h3>
          <p>{formatDateToIndo(images[0]?.createdAt)}</p>
          <p className="py-4">{images[0]?.description}</p>
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
