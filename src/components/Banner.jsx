import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    axios.get("slider.json").then((res) => setSlider(res.data));
  }, []);

  return (
    <div className="mx-5 md:mx-0">
      <Swiper
        className="h-52 md:h-[400px] lg:h-[700px] mx-auto rounded-2xl relative"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {slider.map((s, idx) => (
          <SwiperSlide key={idx} className="relative">
            <img className="w-full h-full" src={s.image} alt={s.title} />
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black/60 via-black/60 to-black/80 flex flex-col justify-center text-white p-10">
              <h2 className="text-center md:text-3xl lg:text-6xl font-bold mb-1 md:mb-5 ml-5">
                <Typewriter
                  words={[s.title]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h2>
              <p className="text-center md:text-lg lg:text-xl mb-5 ml-5">
                {s.description}
              </p>
              <div className="flex justify-center">
                <ul className="hidden md:block list-disc list-inside text-md lg:text-lg ml-5">
                  {s.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
