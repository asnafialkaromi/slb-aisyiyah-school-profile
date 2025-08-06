import React from "react";
import { useState, useEffect, useCallback } from "react";
import ReportFormModal from "../components/ReportFormModal";
import ReportList from "../components/ReportList";
import ReportService from "../api/services/reportService";
import CardSkeletonAnnoun from "../components/skeleton/CardSkeletonAnnoun";
import { LuPlus } from "react-icons/lu";
import Toast from "../components/Toast";

function AdminReport() {
  const [semesterList, setSemesterList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const res = await ReportService.getAllReports();
      const semesters = res.data.map((item) => item.semester);
      setSemesterList(semesters);
      setCurrentIndex(0);
    } catch (err) {
      setToast({ message: "Gagal mengambil laporan.", type: "error" });
      console.error("Gagal memuat laporan:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    if (!semesterList.length) return;
    try {
      setLoading(true);
      const res = await ReportService.getAllReports({
        semester: "" + semesterList[currentIndex] + "",
      });
      if (res && res.status && res.data) {
        setReports(res.data);
      } else {
        console.error("Gagal memuat laporan:", res);
        setToast({ message: "Gagal mengambil laporan.", type: "error" });
      }
    } catch (err) {
      console.error("Gagal mengambil laporan:", err);
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
    document.getElementById("modal_report").showModal();
  }, []);

  const handleSuccess = useCallback(() => {
    setSelectedId(null);
    setRefreshKey((prev) => prev + 1);
    document.getElementById("modal_report").close();
  }, []);

  useEffect(() => {
    fetchSemesters();
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, []);

  useEffect(() => {
    fetchReports();
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, [semesterList, currentIndex, refreshKey]);

  return (
    <div className="p-4">
      <div className="flex flex-col mb-6 gap-4 w-full">
        <h1 className="text-2xl font-bold mx-auto sm:ml-0">Laporan</h1>
        <button
          className="btn btn-primary w-fit mx-auto sm:mr-0"
          onClick={() => {
            setSelectedId(null);
            document.getElementById("modal_report").showModal();
          }}
        >
          <LuPlus className="mr-2 text-lg font-bold" />
          Tambah
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[60vh] overflow-y-scroll">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <CardSkeletonAnnoun key={index} />
          ))}

        {!loading && reports.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Belum ada galeri.
          </div>
        )}
      </div>

      <ReportFormModal selectedId={selectedId} onSuccess={handleSuccess} />
      <ReportList onEdit={handleEdit} reports={reports} loading={loading} />

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12">
        <h2 className="text-lg font-medium">
          Tahun {semesterList[currentIndex] || "-"}
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
      <Toast type={toast.type} message={toast.message} />
    </div>
  );
}

export default AdminReport;
