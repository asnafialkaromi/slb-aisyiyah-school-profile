import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import ReportService from "../api/services/reportService";
import { formatDateToIndo } from "../utils/dateFormatter";

function ReportDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "success" });

  const getReportById = async () => {
    try {
      const data = await ReportService.getReportById(id);
      setReport(data);
      setLoading(true);
    } catch (err) {
      setToast({ message: "Gagal mengambil laporan.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportById();
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, [id]);

  return (
    <div className="pt-32 px-4 pb-12 max-w-7xl min-h-screen mx-auto flex flex-col items-center">
      <Link
        to="/laporan"
        className="btn btn-primary btn-outline mb-6 self-start"
      >
        ← Kembali ke Daftar Laporan
      </Link>

      {loading ? (
        <div className="card p-6 bg-white w-full h-fit shadow-sm">
          <div className="card-body p-0 mb-4">
            <div className="skeleton w-full h-8"></div>
            <div className="skeleton w-1/4 h-6"></div>
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-2/3 h-4"></div>
            <div className="skeleton w-1/3 h-4"></div>
          </div>
          <div className="skeleton aspect-video w-full mb-4"></div>
        </div>
      ) : !report?.data ? (
        // Data kosong / tidak ditemukan
        <div className="text-center text-base-content mt-10">
          <h2 className="text-xl font-semibold">Laporan tidak ditemukan</h2>
          <p className="mt-2 text-sm">Silakan kembali ke daftar Laporan.</p>
        </div>
      ) : (
        <div className="card bg-white shadow-sm  mx-auto">
          <div className="card-body">
            <h2 className="card-title text-primary">{report?.data?.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {formatDateToIndo(report?.data?.createdAt)}
            </p>
            <p className="mb-4">{report?.data?.description}</p>
            <div className="badge badge-outline mb-4">
              {report?.data?.fundingSource || "Tidak diketahui"}
            </div>

            <div className="w-full aspect-[4/3]">
              <iframe
                src={report?.data?.fileUrl + "#toolbar=0"}
                title="PDF Report"
                className="w-full h-full border"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportDetail;
