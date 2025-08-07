import React from "react";
import MailBox from "../assets/icon/mailbox.png";
import Whatsapp from "../assets/icon/whatsapp.png";
import Gmail from "../assets/icon/gmail.png";

function Contacts() {
  return (
    <section className="max-w-7xl pt-32 pb-16 px-4 min-h-screen mx-auto">
      <h1 className="w-full text-4xl font-semibold text-center text-accent-content mb-8">
        Informasi Kontak
      </h1>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
        {/* Informasi Kontak */}
        <div className="flex flex-col items-center justify-center p-4 h-[500px] bg-white shadow-xl w-full md:w-1/2 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Kontak Kami
          </h2>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
              <img src={MailBox} alt="Mailbox" className="w-6 md:w-8" />
              <p className="text-md font-medium text-base-content">
                Kode Pos : 53163
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
              <img src={Whatsapp} alt="Mailbox" className="w-6 md:w-8" />
              <p className="text-md font-medium text-base-content">
                081327275713 - 087876017909
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
              <img src={Gmail} alt="Mailbox" className="w-6 md:w-8" />
              <p className="text-md font-medium text-base-content [word-break:break-all]">
                slbaisyiyahalwalidahajibarang@gmail.com
              </p>
            </div>
          </div>
        </div>
        <iframe
          title="Lokasi SLB Aisyah Al Walidah"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3956.5643751275406!2d109.11072647500114!3d-7.402608192607409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjQnMDkuNCJTIDEwOcKwMDYnNDcuOSJF!5e0!3m2!1sen!2sid!4v1753947471654!5m2!1sen!2sid"
          width="100%"
          height="500"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full lg:w-1/2 h-[500px] border-none rounded-xl"
        />
      </div>
    </section>
  );
}

export default Contacts;
