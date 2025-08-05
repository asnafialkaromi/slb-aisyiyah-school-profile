import React from "react";
import { useState, useCallback, useEffect } from "react";
import GalleryFormModal from "../components/GalleryFormModal";
import GalleryList from "../components/GalleryList";
import GalleryService from "../api/services/galleryService";
import Toast from "../components/Toast";
import CardSkeletonGallery from "../components/skeleton/CardSkeletonGallery";

function AdminGallery() {
  const [semesterList, setSemesterList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const res = await GalleryService.getAllGallery();
      const semesters = res.data.map((item) => item.semester);
      setSemesterList(semesters);
      setCurrentIndex(0);
    } catch (err) {
      setToast({ message: "Gagal mengambil galeri.", type: "error" });
      console.error("Gagal memuat galeri:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleries = async () => {
    if (!semesterList.length) return;
    try {
      setLoading(true);
      const res = await GalleryService.getAllGallery({
        semester: "" + semesterList[currentIndex] + "",
      });
      if (res && res.status && res.data) {
        setGalleries(res.data);
      } else {
        console.error("Gagal memuat galeri:", res);
        setToast({ message: "Gagal mengambil galeri.", type: "error" });
      }
    } catch (err) {
      setToast({ message: "Gagal mengambil galeri.", type: "error" });
      console.error("Gagal memuat galeri:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (currentIndex < semesterList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleEdit = useCallback((id) => {
    setSelectedId(id);
    document.getElementById("modal_gallery").showModal();
  }, []);

  const handleSuccess = useCallback(() => {
    setSelectedId(null);
    setRefresh((prev) => !prev);
    document.getElementById("modal_gallery").close();
  }, []);

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    fetchGalleries();
  }, [semesterList, currentIndex, refresh]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Galeri</h1>
        <label
          htmlFor="modal_gallery"
          className="btn btn-primary"
          onClick={() => {
            setSelectedId(null);
            document.getElementById("modal_gallery").showModal();
          }}
        >
          Tambah Galeri
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-lg font-medium">
          Bulan {semesterList[currentIndex] || "-"}
        </h2>
        <p className="text-sm text-gray-500 my-2 text-center">
          Halaman {currentIndex + 1} dari {semesterList.length}
        </p>

        <div className="join grid grid-cols-2">
          <button
            className="join-item btn btn-primary btn-outline"
            onClick={goToPrevious}
            disabled={currentIndex >= semesterList.length - 1}
          >
            Sebelumnya
          </button>
          <button
            className="join-item btn btn-primary btn-outline"
            onClick={goToNext}
            disabled={currentIndex <= 0}
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[60vh] overflow-y-scroll">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <CardSkeletonGallery key={index} />
          ))}

        {!loading && galleries.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Belum ada galeri.
          </div>
        )}
      </div>

      <GalleryFormModal selectedId={selectedId} onSuccess={handleSuccess} />
      <GalleryList
        onEdit={handleEdit}
        galleries={galleries}
        loading={loading}
      />
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

export default AdminGallery;
