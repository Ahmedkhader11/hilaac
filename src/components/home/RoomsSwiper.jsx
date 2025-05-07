"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
/*
 */

export default function RoomSwiper({ rooms }) {
  const router = useRouter();
  if (!rooms?.length) return <p>Loading rooms…</p>;

  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      slidesPerView={1} // Default to 1 slide for smaller screens
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 2, // 2 slides for small screens (sm: breakpoint in Tailwind)
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2, // 2 slides for medium screens (md: breakpoint in Tailwind)
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3, // 3 slides for large screens (lg: breakpoint in Tailwind)
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3, // 3 slides for extra-large screens (xl: breakpoint in Tailwind)
          spaceBetween: 30,
        },
      }}
      className="mt-5 border border-gray-300 p-3 rounded"
    >
      {rooms.map((room) => (
        <SwiperSlide key={room.id}>
          <div className="mb-3 p-4 hover:shadow-[4px_4px_0px_rgba(63,63,156,0.8)] transition-shadow duration-300 rounded">
            <div className="relative overflow-hidden rounded-lg">
              <a href={`/rooms/${room.id}`} className="block relative">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={400}
                  height={300}
                  className="rounded-lg block w-full h-full object-cover "
                />
              </a>
            </div>
            <div className=" translate-y-[-22px]  ">
              <div className="bg-indigo-700 mb-5 w-3/4 h-11  mx-auto ">
                <ul className="font-semibold text-white pl-5 grid grid-cols-2 leading-10 text-center ">
                  <li className="border-r border-gray-500">
                    {room.price}/Night
                  </li>
                  <li
                    className={`cursor-pointer border-l ${
                      room.booked
                        ? "text-yellow-500 cursor-not-allowed"
                        : "hover:bg-indigo-800"
                    }`}
                    onClick={() =>
                      !room.booked && router.push(`/rooms/${room.id}`)
                    } // Prevent booking action if booked
                  >
                    {room.booked ? "Booked" : "Book Now"}
                  </li>
                </ul>
              </div>
              <h5 className="font-semibold mb-2.5">{room.name}</h5>
              <p className="text-gray-500">{room.description}</p>
            </div>
            <div className="text-center mb:2 lg:mb-4 mt-2 md:mt-2.5 ">
              <ul>
                {[1, 3, 4, 5, 6].map((num) => (
                  <li key={num} className="mr-9 inline-block ">
                    <Image
                      src={`/images/option-icon-${num}.png`}
                      alt="option-icon"
                      width={24}
                      height={24}
                      className={`h-5 w-4 md:w-5 dark:filter-grayscale dark:invert dark:brightness-900`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
