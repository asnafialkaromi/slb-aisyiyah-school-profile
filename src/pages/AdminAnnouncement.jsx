import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnnouncementList from "../components/AnnouncementList";
import AnnouncementFormModal from "../components/AnnouncementFormModal";
import AnnouncementService from "../api/services/announcementService";
import Toast from "../components/Toast";
import CardSkeletonAnnoun from "../components/skeleton/CardSkeletonAnnoun";
import { LuPlus } from "react-icons/lu";

function AdminAnnouncement() {
  const [semesterList, setSemesterList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const res = await AnnouncementService.getAllAnnouncements();
      const semesters = res.data.map((item) => item.semester);
      setSemesterList(semesters);
      setCurrentIndex(0);
    } catch (err) {
      setToast({ message: "Gagal mengambil semester", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    if (!semesterList.length) return;
    try {
      setLoading(true);
      setAnnouncements([]);
      const res = await AnnouncementService.getAllAnnouncements({
        semester: "" + semesterList[currentIndex] + "", //"" + params + "",
      });

      if (res && res.status && res.data) {
        setAnnouncements(res.data);
      } else {
        setToast({
          message: "Gagal mengambil data pengumuman.",
          type: "error",
        });
      }
    } catch (err) {
      setToast({ message: "Gagal mengambil data pengumuman.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [semesterList, currentIndex]);

  const handleEdit = useCallback((id) => {
    setSelectedId(id);
    document.getElementById("modal_announcement").showModal();
  }, []);

  const handleSuccess = useCallback(async () => {
    setSelectedId(null);
    await fetchSemesters();
    document.getElementById("modal_announcement").close();
  }, []);

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

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col mb-8 gap-4 w-full">
          <h1 className="text-2xl font-bold mx-auto sm:ml-0">Pengumuman</h1>
          <button
            className="btn btn-primary mx-auto sm:mr-0"
            onClick={() => {
              setSelectedId(null);
              document.getElementById("modal_announcement").showModal();
            }}
          >
            <LuPlus className="mr-2 text-lg font-bold" />
            Tambah
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <CardSkeletonAnnoun key={index} />
            ))}
        </div>

        {!loading && announcements.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Belum ada pengumuman.
          </div>
        )}

        <AnnouncementFormModal
          onSuccess={handleSuccess}
          selectedId={selectedId}
        />

        <AnnouncementList
          announcements={announcements}
          loading={loading}
          onEdit={handleEdit}
        />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12">
          <h2 className="text-lg font-medium">
            Semester {semesterList[currentIndex] || "-"}
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

        <Toast message={toast.message} type={toast.type} />
      </div>
    </>
  );
}

export default AdminAnnouncement;
