import React from "react";
import HeroImage from "../assets/images/HeroImage.png";

function Hero({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero bg-primary  min-h-screen pt-16">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Selamat Datang di Sekolah
          </h1>
          <h2 className="text-5xl font-bold text-white">
            SLB Aisyah Al Walidah
          </h2>
          <p className="py-6 text-white">
            Kami menyediakan pendidikan berkualitas untuk masa depan yang lebih
            baik. Bergabunglah dengan kami untuk pengalaman belajar yang
            menyenangkan dan inspiratif.
          </p>
          <button
            className="btn btn-primary-content text-primary"
            onClick={handleScroll}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
        <img
          src={HeroImage}
          className="w-5xl rounded-lg object-cover shadow-2xl "
        />
      </div>
    </div>
  );
}

export default Hero;
