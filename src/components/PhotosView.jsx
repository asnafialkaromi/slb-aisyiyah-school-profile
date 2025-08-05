import React from "react";
import images1 from "../assets/images/gallery1.jpeg";
import images2 from "../assets/images/gallery2.jpeg";
import images3 from "../assets/images/gallery3.jpeg";
import images4 from "../assets/images/gallery4.jpeg";
import images5 from "../assets/images/gallery5.jpeg";
import images6 from "../assets/images/gallery6.jpeg";
import images7 from "../assets/images/gallery7.jpeg";
import images8 from "../assets/images/gallery8.jpeg";
import { useAOS } from "../hooks/useAOS";

function PhotosView() {
  useAOS({ once: false });
  const images = [
    images1,
    images2,
    images3,
    images4,
    images5,
    images6,
    images7,
    images8,
  ];
  return (
    <section className="max-w-7xl py-16 mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Foto - foto</h1>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-2">
        {images.map((data, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={index}
            className="mb-2 break-inside-avoid shadow-md hover:shadow-lg transition duration-300 rounded-lg"
          >
            <img
              src={data}
              alt={`Gallery ${index + 1}`}
              className="w-full object-cover transform hover:scale-[102%] transition duration-300 rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PhotosView;
