import React from 'react';
import { forwardRef } from 'react';
import PeopleCarry from '../assets/icon/student-group.png';
import UserGraduate from '../assets/icon/student.png';
import Shop from '../assets/icon/online-shop.png';
import { useAOS } from '../hooks/useAOS';

const Class = forwardRef((props, ref) => {
  useAOS({ once: false });

  const missions = [
    {
      icon: <img src={PeopleCarry} alt="People Carry" className="w-16 h-16" />,
      text: 'Menjalin kerjasama dengan semua pihak untuk memajukan pendidikan luar biasa.',
    },
    {
      icon: <img src={UserGraduate} alt="User Graduate" className="w-16 h-16" />,
      text: 'Meningkatkan kemampuan profesional dan kompetensi guru pendidikan luar biasa.',
    },
    {
      icon: <img src={Shop} alt="Shop" className="w-16 h-16" />,
      text: 'Menanamkan kemampuan wirausaha sejak dini.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white text-base-content" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mx-auto w-fit mb-8">Jumlah Peserta Didik</h2>

        {/* Jumlah peserta card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((item, index) => (
            <div data-aos="fade-up" data-aos-delay={index * 100} key={index} className="card bg-base-100 border-1 shadow-lg min-h-52 hover:shadow-xl transition">
              <div className="card-body items-center text-center">
                <h2 className="text-2xl font-semibold">SDLB</h2>
                {/* SDLB, SMPLB, SMALB */}
                <img src={UserGraduate} alt="User Graduate" className="w-16 h-16"></img>
                <p className="mt-4 text-sm text-left text-base-content">Perempuan : 32</p>
                <p className="text-sm text-left text-base-content">Laki-Laki : 32</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Class;
