import React from "react";
import { useState, useEffect } from "react";
import ReportService from "../api/services/reportService";
import Toast from "./Toast";

function ReportFormModal({ selectedId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    fundingSource: "",
    pdf: null,
  });

  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchReportByParams();
  }, [selectedId]);

  const fetchReportByParams = async () => {
    setLoading(true);
    if (selectedId) {
      try {
        const res = await ReportService.getReportById(selectedId);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          date: res.data.date || "",
          fundingSource: res.data.fundingSource || "",
          pdf: res.data.fileUrl,
        });
      } catch (err) {
        console.error("Gagal mengambil data laporan:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        title: "",
        description: "",
        date: "",
        fundingSource: "",
        pdf: null,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === "pdf" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    setLoading(true);
    try {
      if (selectedId) {
        await ReportService.updateReport(selectedId, formData);
        setToast({ message: "Laporan berhasil diperbarui!", type: "success" });
      } else {
        await ReportService.createReport(formData);
        setToast({ message: "Laporan berhasil ditambahkan!", type: "success" });
      }
      onSuccess();
    } catch (err) {
      console.error("Gagal menyimpan laporan:", err);
      setToast({
        message: `Gagal menyimpan laporan ${err.response.data.err}.`,
        type: "error",
      });
    } finally {
      setForm({
        title: "",
        description: "",
        date: "",
        fundingSource: "",
        pdf: null,
      });
      setLoading(false);
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await ReportService.deleteReport(selectedId);
      setToast({ message: "Laporan berhasil dihapus!", type: "success" });
      onSuccess();
    } catch (err) {
      console.error("Gagal menghapus laporan:", err);
      setToast({ message: "Gagal menghapus laporan.", type: "error" });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  return (
    <>
      <dialog id="modal_report" className="modal px-4">
        <div className="modal-box max-w-4xl">
          {loading ? (
            <div className="flex flex-col h-[80vh] items-center justify-center z-10">
              <div className="loading loading-spinner loading-xl text-primary" />
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg mb-4">
                {selectedId ? "Edit Laporan" : "Tambah Laporan"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label>Judul</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label>Deskripsi</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full min-h-40"
                    required
                  />
                </div>
                <div>
                  <label>Tanggal</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label>Sumber Dana</label>
                  <input
                    type="text"
                    name="fundingSource"
                    value={form.fundingSource}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label>File Laporan (PDF)</label>
                  <input
                    type="file"
                    name="pdf"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="file-input file-input-bordered w-full mb-8"
                    required
                  />
                  <iframe
                    src={
                      form.pdf instanceof File
                        ? URL.createObjectURL(form.pdf)
                        : form.pdf
                    }
                    className={`w-full min-h-[600px] rounded-lg  ${
                      !form.pdf ? "hidden" : ""
                    }`}
                  ></iframe>
                </div>
                <div className="modal-action justify-between">
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-success">
                      {selectedId ? "Perbarui" : "Simpan"}
                    </button>
                    {selectedId && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-error"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("modal_report").close()
                    }
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <Toast type={toast.type} message={toast.message} />
      </dialog>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}

export default ReportFormModal;
