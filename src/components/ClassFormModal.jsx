import React from "react";
import { useState, useEffect } from "react";
import Toast from "./Toast";
import ClassService from "../api/services/classService";

const ClassFormModal = ({ selectedId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    level: "",
    male: "",
    female: "",
  });

  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchClassById();
  }, [selectedId]);

  const fetchClassById = async () => {
    setLoading(true);
    if (selectedId) {
      try {
        const res = await ClassService.getClassById(selectedId);
        const data = res.data;
        setForm({
          level: data.level || "",
          male: parseInt(data.male, 10) || 0,
          female: parseInt(data.female, 10) || 0,
        });
      } catch (err) {
        console.error("Gagal memuat data kelas:", err);
        setToast({ message: "Gagal memuat data kelas.", type: "error" });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({ level: "", male: "", female: "" });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "male" || name === "female" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedId) {
        await ClassService.updateClass(selectedId, form);
        setToast({ message: "Kelas berhasil diperbarui!", type: "success" });
      } else {
        await ClassService.createClass(form);
        setToast({ message: "Kelas berhasil ditambahkan!", type: "success" });
      }
      onSuccess();
    } catch (err) {
      console.error("Gagal menyimpan kelas:", err);
      setToast({ message: "Gagal menyimpan kelas.", type: "error" });
    } finally {
      setLoading(false);
      setForm({ level: "", male: "", female: "" });
      setTimeout(() => setToast({ message: "", type: "success" }), 3000);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await ClassService.deleteClass(selectedId);
      setToast({ message: "Kelas berhasil dihapus!", type: "success" });
      onSuccess();
    } catch (err) {
      console.error("Gagal menghapus kelas:", err);
      setToast({ message: "Gagal menghapus kelas.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: "", type: "success" }), 3000);
    }
  };

  return (
    <>
      <dialog id="modal_class" className="modal px-4">
        <div className="modal-box w-full max-w-2xl relative">
          {loading ? (
            <div className="flex flex-col h-[80vh] items-center justify-center z-10">
              <div className="loading loading-spinner loading-xl text-primary" />
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg mb-4">
                {selectedId ? "Edit Kelas" : "Tambah Kelas"}
              </h3>
              <form method="dialog">
                <button
                  onClick={() => document.getElementById("modal_class").close()}
                  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                >
                  ✕
                </button>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <label>Kelas</label>
                <input
                  type="text"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <label>Laki-Laki</label>
                <input
                  type="number"
                  name="male"
                  value={form.male}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <label>Perempuan</label>
                <input
                  type="number"
                  name="female"
                  value={form.female}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <div className="modal-action justify-between">
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {selectedId ? "Perbarui" : "Simpan"}
                    </button>
                    {selectedId && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-error"
                        disabled={loading}
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("modal_class").close()
                    }
                    className="btn"
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
};

export default ClassFormModal;
