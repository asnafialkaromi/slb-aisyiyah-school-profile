import React from "react";
import { useEffect, useState } from "react";
import images1 from "../assets/images/gallery1.jpeg";
import images2 from "../assets/images/gallery2.jpeg";
import images3 from "../assets/images/gallery3.jpeg";
import images4 from "../assets/images/gallery4.jpeg";
import images5 from "../assets/images/gallery5.jpeg";
import images6 from "../assets/images/gallery6.jpeg";
import images7 from "../assets/images/gallery7.jpeg";
import images8 from "../assets/images/gallery8.jpeg";
import { useAOS } from "../hooks/useAOS";
import GalleryService from "../api/services/galleryService";

function PhotosView() {
  useAOS({ once: false });
  const [documentation, setDocumentation] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLatestDocumentations = async () => {
    try {
      setLoading(true);
      const res = await GalleryService.getLatestGallery({
        limit: 10,
      });
      setDocumentation(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestDocumentations();
  }, []);

  return (
    <section className="py-16 px-4 mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Galeri</h1>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-2 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
              className="mb-2 break-inside-avoid shadow-lg hover:shadow-xl transition duration-300 rounded-lg"
            >
              <div className="skeleton h-96 w-full"></div>
            </div>
          ))
        ) : documentation.length === 0 ? (
          <div className="absolute mx-auto w-full max-w-7xl text-gray-500">
            Tidak ada dokumentasi yang tersedia.
          </div>
        ) : (
          documentation.map((data, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
              className="mb-2 break-inside-avoid shadow-lg hover:shadow-xl transition duration-300 rounded-lg"
            >
              <img
                src={data.imageUrl}
                alt={`Gallery ${index + 1}`}
                className="w-full object-cover transform hover:scale-[102%] transition duration-300 rounded-lg"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default PhotosView;
