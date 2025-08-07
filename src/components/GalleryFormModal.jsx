import React from "react";
import { useState, useEffect } from "react";
import GalleryService from "../api/services/galleryService";
import Toast from "./Toast";

function GalleryFormModal({ selectedId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchDataById();
  }, [selectedId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchDataById = async () => {
    setLoading(true);
    if (selectedId) {
      try {
        const res = await GalleryService.getGalleryById(selectedId);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          date: res.data.date || "",
          image: null,
        });
        setPreviewImage(res.data.imageUrl || null);
      } catch (err) {
        setToast({ message: "Gagal mengambil data galeri.", type: "error" });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({ title: "", description: "", date: "", image: null });
      setPreviewImage(null);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);
    if (form.image) formData.append("image", form.image);

    console.log(form.date);

    try {
      if (selectedId) {
        await GalleryService.updateGallery(selectedId, formData);
        setToast({ message: "Galeri berhasil diperbarui!", type: "success" });
      } else {
        await GalleryService.createGallery(formData);
        setToast({ message: "Galeri berhasil ditambahkan!", type: "success" });
      }
      setLoading(false);
      onSuccess();
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setToast({ message: "Gagal menyimpan galeri " + { err }, type: "error" });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await GalleryService.deleteGallery(selectedId);
      setToast({ message: "Galeri berhasil dihapus!", type: "success" });
      setLoading(false);
      onSuccess();
    } catch (err) {
      console.error("Gagal menghapus galeri:", err);
      setToast({ message: "Gagal menghapus galeri.", type: "error" });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  return (
    <>
      <dialog id="modal_gallery" className="modal">
        <div className="modal-box max-w-2xl">
          {loading ? (
            <div className="flex flex-col h-[80vh] items-center justify-center z-10">
              <div className="loading loading-spinner loading-xl text-primary" />
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg mb-4">
                {selectedId ? "Edit Galeri" : "Tambah Galeri"}
              </h3>
              <form method="dialog">
                <button
                  onClick={() =>
                    document.getElementById("modal_gallery").close()
                  }
                  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                >
                  ✕
                </button>
              </form>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-3"
              >
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  value={form.title}
                  onChange={handleChange}
                  required
                />

                <label>Deskripsi</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full min-h-40"
                  value={form.description}
                  onChange={handleChange}
                  required
                />

                <label>Tanggal</label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                <label>Foto</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                  required
                  // {...(!selectedId && { required: true })}
                />

                {previewImage && (
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">
                      Preview Gambar:
                    </label>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="rounded max-h-48 border"
                    />
                  </div>
                )}

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
                    className="btn"
                    onClick={() =>
                      document.getElementById("modal_gallery").close()
                    }
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <Toast message={toast.message} type={toast.type} />
      </dialog>
      <Toast message={toast.message} type={toast.type} />
    </>
  );
}

export default GalleryFormModal;
