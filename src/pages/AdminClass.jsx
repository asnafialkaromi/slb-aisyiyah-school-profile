import React from "react";
import { useState, useEffect, useCallback } from "react";
import { LuPlus } from "react-icons/lu";
import { useAOS } from "../hooks/useAOS";
import ClassService from "../api/services/classService";
import Toast from "../components/Toast";
import ClassFormModal from "../components/ClassFormModal";

function AdminClass() {
  const [selectedId, setSelectedId] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useAOS({ once: false });

  const fetchStudentsData = async () => {
    try {
      setLoading(true);
      const res = await ClassService.getAllClass();
      setStudentsData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = useCallback((id) => {
    setSelectedId(id);
    document.getElementById("modal_class").showModal();
  }, []);

  const handleSuccess = useCallback(async () => {
    setSelectedId(null);
    fetchStudentsData();
    document.getElementById("modal_class").close();
  }, []);

  useEffect(() => {
    fetchStudentsData();
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col mb-6 gap-4 w-full">
        <h1 className="text-2xl font-bold mx-auto sm:ml-0">Kelas</h1>

        <button
          className="btn btn-primary w-fit mx-auto sm:mr-0"
          onClick={() => {
            setSelectedId(null);
            document.getElementById("modal_class").showModal();
          }}
        >
          <LuPlus className="mr-2 text-lg font-bold" />
          Tambah
        </button>
      </div>

      <ClassFormModal selectedId={selectedId} onSuccess={handleSuccess} />

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Kelas</th>
              <th>Laki - Laki</th>
              <th>Perempuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="w-2">
                  <div className="skeleton h-6 w-14"></div>
                </td>
                <td className="w-2">
                  <div className="skeleton h-6 w-8"></div>
                </td>
                <td className="w-2">
                  <div className="skeleton h-6 w-8"></div>
                </td>
                <td className="w-2">
                  <div className="skeleton h-6 w-10"></div>
                </td>
              </tr>
            ) : (
              studentsData.map((data, index) => (
                <tr key={index}>
                  <td>{data.level}</td>
                  <td>{data.male}</td>
                  <td>{data.female}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleEdit(data.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

export default AdminClass;
