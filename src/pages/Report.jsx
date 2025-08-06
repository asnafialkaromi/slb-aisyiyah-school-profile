import React from "react";
import { useState, useEffect, useCallback } from "react";
import ReportList from "../components/ReportList";
import ReportService from "../api/services/reportService";
import CardSkeletonAnnoun from "../components/skeleton/CardSkeletonAnnoun";
import Toast from "../components/Toast";

function Report() {
  const [semesterList, setSemesterList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    fetchReports();
  }, [semesterList, currentIndex]);
  return (
    <section className="max-w-7xl pt-32 pb-16 px-4  min-h-screen mx-auto">
      <h1 className="w-fit text-4xl font-semibold mx-auto text-accent-content mb-8">
        Laporan
      </h1>

      {/* Reports */}
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

      <ReportList reports={reports} loading={loading} />

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-24">
        <h2 className="text-lg font-medium">
          Tahun {semesterList[currentIndex] || "-"}
        </h2>
        <p className=" md:absolute max-w-[1248px] mx-auto w-full text-sm text-gray-500 my-2 text-center -z-10">
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
    </section>
  );
}

export default Report;
