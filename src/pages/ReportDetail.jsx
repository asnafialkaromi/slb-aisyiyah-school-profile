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

  const getReportById = async () => {
    try {
      const data = await ReportService.getReportById(id);
      setReport(data);
      console.log(data);
    } catch (err) {
      console.log("Gagal memuat data" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportById();
  }, [id]);

  return (
    <div className="pt-32 px-4 pb-12 max-w-7xl container mx-auto">
      <Link
        to="/laporan"
        className="btn btn-primary btn-outline mb-6 self-start"
      >
        ← Kembali ke Daftar Laporan
      </Link>
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
    </div>
  );
}

export default ReportDetail;
