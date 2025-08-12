import React from "react";
import { useState, useEffect } from "react";
import AnnouncementService from "../api/services/announcementService";
import Toast from "./Toast";

const AnnouncementFormModal = ({ onSuccess, selectedId }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchAnnouncementById();
  }, [selectedId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      if (selectedId) {
        await AnnouncementService.updateAnnouncement(selectedId, formData);
        setToast({
          message: "Pengumuman berhasil diperbarui!",
          type: "success",
        });
      } else {
        await AnnouncementService.createAnnouncement(formData);
        setToast({
          message: "Pengumuman berhasil ditambahkan!",
          type: "success",
        });
      }
      onSuccess();
    } catch (err) {
      console.error("Gagal menyimpan pengumuman:", err);
      setToast({ message: "Gagal menyimpan pengumuman.", type: "error" });
    } finally {
      setLoading(false);
      setForm({ title: "", description: "", image: null });
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const fetchAnnouncementById = async () => {
    setLoading(true);
    if (selectedId) {
      try {
        const res = await AnnouncementService.getAnnouncementById(selectedId);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          image: null,
        });
        if (res.data.imageUrl) {
          setPreviewImage(res.data.imageUrl);
        }
      } catch (err) {
        console.error("Gagal memuat pengumuman:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setForm({ title: "", description: "", image: null });
      setPreviewImage(null);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await AnnouncementService.deleteAnnoucement(selectedId);
      setToast({ message: "Pengumuman berhasil dihapus!", type: "success" });
      onSuccess();
    } catch (err) {
      console.error("Gagal menghapus pengumuman:", err);
      setToast({ message: "Gagal menghapus pengumuman.", type: "error" });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  return (
    <>
      <dialog id="modal_announcement" className="modal px-4">
        <div className="modal-box w-full max-w-2xl relative">
          {loading ? (
            <div className="flex flex-col h-[80vh] items-center justify-center z-10">
              <div className="loading loading-spinner loading-xl text-primary" />
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg mb-4">
                {selectedId ? "Edit Pengumuman" : "Tambah Pengumuman"}
              </h3>
              <form method="dialog">
                <button
                  onClick={() =>
                    document.getElementById("modal_announcement").close()
                  }
                  className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                >
                  ✕
                </button>
              </form>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="flex flex-col space-y-3"
              >
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full min-h-40"
                  required
                ></textarea>

                <label>Gambar</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                  {...(!selectedId && { required: true })}
                />

                {previewImage && (
                  <div className="mt-2">
                    <label className="text-md mb-4 block">
                      Preview Gambar:
                    </label>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-48 rounded"
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
                    onClick={() =>
                      document.getElementById("modal_announcement").close()
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

export default AnnouncementFormModal;
