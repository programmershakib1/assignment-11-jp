import React, { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = React.useRef({});

  useLayoutEffect(() => {
    const savedPosition = scrollPositions.current[location.key];
    if (savedPosition) {
      window.scrollTo({
        top: savedPosition.y,
        left: savedPosition.x,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[location.key] = {
        x: window.scrollX,
        y: window.scrollY,
      };
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return null;
};

export default ScrollRestoration;
