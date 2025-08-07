import React from "react";
import { forwardRef } from "react";
import Flag from "../assets/icon/flag.png";
import Education from "../assets/icon/education.png";
import Book from "../assets/icon/book.png";
import Praying from "../assets/icon/praying.png";
import PeopleCarry from "../assets/icon/student-group.png";
import UserGraduate from "../assets/icon/student.png";
import Shop from "../assets/icon/online-shop.png";
import Bullseye from "../assets/icon/target.png";
import Gallery4 from "../assets/images/gallery4.jpeg";
import { useAOS } from "../hooks/useAOS";

const VisionMission = forwardRef((props, ref) => {
  useAOS({ once: false });

  const vision = {
    icon: <img src={Flag} alt="Flag" className="w-8 mr-2" />,
    title: "Visi",
    text: "Menjadi sekolah inklusif yang unggul dalam pembentukan karakter, pengetahuan, dan keterampilan untuk peserta didik berkebutuhan khusus yang mandiri dan berakhlak mulia.",
  };

  const missions = [
    {
      icon: <img src={Education} alt="Education" className="w-16 h-16" />,
      text: "Memberi pelayanan pendidikan bagi anak berkebutuhan khusus sesuai dengan kemampuan dan potensi yang dimiliki secara optimal.",
    },
    {
      icon: <img src={Book} alt="Book 2" className="w-16 h-16" />,
      text: "Menerapkan kurikulum PLB yang sudah diterapkan oleh pemerintah.",
    },
    {
      icon: <img src={Praying} alt="Hands Helping" className="w-16 h-16" />,
      text: "Membimbing anak-anak berkebutuhan khusus dalam melaksanakan ajaran agama sesuai dengan kondisi fisik dan mentalnya agar menjadi insan yang beriman dan bertaqwa.",
    },
    {
      icon: <img src={PeopleCarry} alt="People Carry" className="w-16 h-16" />,
      text: "Menjalin kerjasama dengan semua pihak untuk memajukan pendidikan luar biasa.",
    },
    {
      icon: (
        <img src={UserGraduate} alt="User Graduate" className="w-16 h-16" />
      ),
      text: "Meningkatkan kemampuan profesional dan kompetensi guru pendidikan luar biasa.",
    },
    {
      icon: <img src={Shop} alt="Shop" className="w-16 h-16" />,
      text: "Menanamkan kemampuan wirausaha sejak dini.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white text-base-content" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-20 font-bold mx-auto bg-primary text-white w-fit px-8 py-2 rounded-full">
          Visi & Misi
        </h2>

        {/* Visi */}
        <div className="flex flex-col lg:flex-row max-w-7xl items-center justify-between gap-28 lg:gap-0 text-center mb-40">
          <img
            src={Gallery4}
            alt="Visi"
            className="aspect-video object-cover lg:w-[45%] h-auto rounded-xl drop-shadow-2xl"
            data-aos="fade-right"
          />
          <div
            data-aos="fade-left"
            className="flex flex-col w-full lg:w-1/2 items-center text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              {vision.icon}
              <h3 className="text-3xl font-semibold text-primary">
                {vision.title}
              </h3>
            </div>
            <p className="max-w-xl w-full text-xl">{vision.text}</p>
          </div>
        </div>

        {/* Misi */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img src={Bullseye} alt="Bullseye" className="w-8 mr-2" />
            <h3 className="text-2xl font-semibold text-primary">Misi</h3>
          </div>
          <p className="mb-8">
            Berikut beberapa misi yang kami emban dalam mendidik dan membina
            peserta didik:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((item, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
              className="card bg-base-100 border-1 shadow-lg min-h-52 hover:shadow-xl transition"
            >
              <div className="card-body items-center text-center">
                {item.icon}
                <p className="mt-4 text-sm text-center text-base-content">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default VisionMission;
