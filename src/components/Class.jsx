import React from "react";
import { useState, useEffect } from "react";
import { forwardRef } from "react";
import UserGraduate from "../assets/icon/student.png";
import { useAOS } from "../hooks/useAOS";
import ClassService from "../api/services/classService";

const Class = forwardRef((props, ref) => {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useAOS({ once: false });

  const fetchStudentsData = async () => {
    try {
      setIsLoading(true);
      const res = await ClassService.getAllClass();
      setStudentsData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  return (
    <section className="py-16 px-4 bg-white text-base-content" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mx-auto w-fit mb-8">
          Jumlah Peserta Didik
        </h2>

        {/* Jumlah peserta card */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {studentsData.map((data, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
              className="card bg-base-100 border-1 shadow-lg min-h-52 hover:shadow-xl transition w-full"
            >
              <div className="card-body items-center text-center">
                <h2 className="text-2xl font-semibold">{data.level}</h2>
                {/* SDLB, SMPLB, SMALB */}
                <img
                  src={UserGraduate}
                  alt="User Graduate"
                  className="w-16 h-16"
                ></img>
                <p className="mt-4 text-sm text-left text-base-content">
                  Perempuan : {data.female}
                </p>
                <p className="text-sm text-left text-base-content">
                  Laki-Laki : {data.male}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Class;
