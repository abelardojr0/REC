import { useState, useEffect } from "react";

const useScrollUp = () => {
  const [scrollUp, setScrollUp] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrolledUp = currentScrollPos < window.scrollY;
      setScrollUp(scrolledUp);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollUp;
};

export default useScrollUp;
