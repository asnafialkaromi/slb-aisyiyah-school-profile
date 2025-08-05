import React from "react";
import { useState, useEffect } from "react";
import AnnouncementList from "./AnnouncementList";
import AnnouncementService from "../api/services/announcementService";
import CardSkeletonAnnoun from "./skeleton/CardSkeletonAnnoun";

function LatestAnnouncement() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const res = await AnnouncementService.getAllAnnouncements();
      const semesters = res.data.map((item) => item.semester);
      setSemesterList(semesters);
      setCurrentIndex(0);
      console.log(semesters);
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
      const res = await AnnouncementService.getAllAnnouncements({
        semester: "" + semesterList[currentIndex] + "",
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
  }, [currentIndex, semesterList]);

  return (
    <section className="py-16 px-4 w-full bg-white text-base-content">
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-4xl font-semibold mx-auto w-fit mb-8">
          Pengumuman terbaru
        </h2>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardSkeletonAnnoun />
            <CardSkeletonAnnoun />
            <CardSkeletonAnnoun />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-center mx-auto">
          <AnnouncementList
            announcements={announcements.slice(0, 3)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            semesterList={semesterList}
          />
        </div>
      </div>
    </section>
  );
}

export default LatestAnnouncement;
