import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialCard = ({ imageSrc, name, role, rating }) => (
  <div className="bg-white rounded-lg p-6 md:p-8 w-80 sm:w-96 shadow-[4px_0px_0px_rgba(63,63,156,0.2)] hover:shadow-[4px_0px_0px_rgba(63,63,156,0.8)]  transition-shadow duration-300 mb-10 ">
    <div className="flex items-center justify-between mb-4">
      <img
        src={imageSrc}
        alt={name}
        className="rounded-full w-16 h-16 mr-4 object-cover"
      />
      <div className="flex-grow">
        <h5 className="font-bold text-gray-800 mb-1">{name}</h5>
        <small className="text-gray-500">{role}</small>
      </div>
      <img
        src="/images/Quote.png"
        alt="quotes"
        className="w-8 h-8 text-gray-400"
      />
    </div>
    <div className="text-yellow-500 mb-3">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 inline-block mr-1 ${
            index < rating ? "fill-current" : "fill-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.953L10 1l2.868 5.692 6.545.953-4.706 4.095 1.176 6.545z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 leading-relaxed">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      consequuntur cupiditate quisquam minima nam perspiciatis dignissimos nemo
      nostrum et illum! Ipsum accusamus sit quam. Voluptate hic numquam eum illo
      animi optio est magni sint, alias quae, amet ipsum odio aliquid!
    </p>
  </div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      imageSrc: "/images/test-1.png",
      name: "Abdishakour Eid",
      role: "Client",
      rating: 5,
    },
    {
      imageSrc: "/images/test-2.png",
      name: "Abdihamid Abdillahi",
      role: "Customer",
      rating: 4,
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Ahmed Khader",
      role: "User",
      rating: 3,
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Subeer Awal",
      role: "Customer",
      rating: 5,
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Abdiqadir Dayib",
      role: "Customer",
      rating: 4,
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Shucayb Harun",
      role: "Customer",
      rating: 5,
    },
  ];

  return (
    <div className="container  mx-auto px-2 sm:px-3 lg:px-5 py-5">
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        loop={false}
        freeMode={true}
        className="overflow-hidden"
        breakpoints={{
          640: {
            // sm:
            slidesPerView: 1.5,
          },
          768: {
            // md:
            slidesPerView: 2.1,
          },
          1024: {
            // lg:
            slidesPerView: 3.1,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="snap-start ">
            <TestimonialCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
