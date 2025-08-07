import React from "react";

function GoogleMapEmbed() {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          Lokasi Sekolah
        </h2>
        <p className="mb-8">
          Alamat Desa Banjarsari Rt 01 Rw 07 Kec. Ajibarang Kab. Banyumas
        </p>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Lokasi SLB Aisyah Al Walidah"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3956.5643751275406!2d109.11072647500114!3d-7.402608192607409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjQnMDkuNCJTIDEwOcKwMDYnNDcuOSJF!5e0!3m2!1sen!2sid!4v1753947471654!5m2!1sen!2sid"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[500px] border-none"
          />
        </div>
      </div>
    </section>
  );
}

export default GoogleMapEmbed;
