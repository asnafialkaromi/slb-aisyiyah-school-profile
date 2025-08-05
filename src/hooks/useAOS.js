import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const isMobile = window.innerWidth < 768;

const defaultOptions = {
  duration: 600,
  once: true,
  offset: isMobile ? 20 : 100,
};

export function useAOS(options = {}) {
  useEffect(() => {
    AOS.init({ ...defaultOptions, ...options });
    AOS.refresh();

    return () => {
      AOS.refresh();
    };
  }, [JSON.stringify(options)]);
}
