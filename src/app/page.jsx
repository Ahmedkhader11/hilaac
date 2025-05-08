"use client";

import Banner from "@/components/home/banner";
import RoomsdataFetching from "@/components/home/roomsdataFetching";
import TestimonialSwiper from "@/components/home/TestimonialSwiper";
import Link from "next/link";
/*
 */
export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex justify-between items-center  flex-wrap lg:flex-nowrap mx-auto max-w-screen min-h-screen bg-[url('/images/hero-bg.png')] bg-cover bg-center ">
        <section className="w-full lg:w-7/12 p-4 ">
          <div className=" p-6  rounded-lg">
            <h1 className="text-4xl lg:text-8xl font-bold mb-4 text-white">
              Enjoy a Luxury Experience
            </h1>
            <p className="text-gray-200 mb-10">
              Welcome to Hilaac Hotel, where elegance meets comfort. Whether
              you're here for a relaxing getaway or a business retreat, our
              thoughtfully designed spaces, exquisite dining, and world-class
              hospitality ensure an unforgettable experience. Indulge in luxury,
              embrace serenity, and let us redefine your stay.
            </p>

            <button className="px-10 py-2  text-white rounded bg-indigo-600 hover:bg-indigo-800 transition-all duration-200 cursor-pointer font-bold tracking-widest ">
              Visit Us
            </button>
          </div>
        </section>

        {/* Booking Form */}
        <section className="w-full lg:w-5/12 p-4">
          <div className="booking-form bg-white p-6 rounded-lg shadow-md dark:text-black">
            <h2 className="text-2xl font-bold mb-4">Book A Room</h2>
            <div className="flex flex-wrap -mx-2 ">
              {/* Check-in Date */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="booking-box">
                  <p className="text-gray-700 mb-2 flex items-center">
                    <img
                      src="/images/check-icon.png"
                      alt="check-icon"
                      className="w-5 h-5 mr-2"
                    />
                    Check in Date
                  </p>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2 "
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="booking-box">
                  <p className="text-gray-700 mb-2 flex items-center">
                    <img
                      src="/images/xbox-x.png"
                      alt="check-icon"
                      className="w-5 h-5 mr-2"
                    />
                    Check Out Date
                  </p>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Adults */}
            <div className="w-full mb-4">
              <div className="booking-box">
                <p className="text-gray-700 mb-2 flex items-center">
                  <img
                    src="/images/users-icon.png"
                    alt="check-icon"
                    className="w-5 h-5 mr-2"
                  />
                  Adults
                </p>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="Adults">Adults</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              {/* Child */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="booking-box">
                  <p className="text-gray-700 mb-2 flex items-center">
                    <img
                      src="/images/baby-icon.png"
                      alt="check-icon"
                      className="w-5 h-5 mr-2"
                    />
                    Child
                  </p>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="Child">Child</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              {/* Room */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="booking-box">
                  <p className="text-gray-700 mb-2 flex items-center">
                    <img
                      src="/images/room-icon.png"
                      alt="check-icon"
                      className="w-5 h-5 mr-2"
                    />
                    Room
                  </p>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="Room">Room</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer transition-all duration-200">
              <Link href={"/rooms"}>CHECK AVAILABILITY</Link>
            </button>
          </div>
        </section>
      </section>
      {/* About Us */}
      <section className="container mx-auto my-20 py-5 ">
        <div className="container mx-auto max-w-screen px-4 flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap lg:flex-nowrap pb-10 ">
          {/* Image Container */}
          <div className=" w-full mx-auto  flex-1/3 lg:w-1/2 relative pr-20  mt-4">
            <img
              src="/images/about-1.png"
              alt="hotel_img"
              className="w-full h-auto shadow-sm rounded-lg"
            />
            <img
              src="/images/about-2.png"
              alt="bedroom_img"
              className="absolute bottom-0 right-0 w-1/2 shadow-sm p-1 bg-white rounded-lg  -translate-x-12"
            />
          </div>

          {/* Text Content */}
          <div className="w-full flex-1/2 lg:w-1/2 pl-10">
            <div className="mb-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                About Us
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4 text-indigo-700 font-serif">
                Most Safe & Rated <br />
                Hotel In Hargeisa
              </h2>
            </div>

            <p className="text-gray-800 mb-4 dark:text-gray-400">
              Nestled in the heart of Hargeisa, Hilaac Hotel stands as a beacon
              of comfort, security, and excellence. With a commitment to
              top-tier hospitality, we offer a serene escape where elegance
              meets modern convenience.
            </p>

            <p className="text-gray-800 mb-6 dark:text-gray-400">
              Whether you're traveling for business or leisure, our
              well-appointed rooms, exceptional service, and warm atmosphere
              ensure an experience beyond expectations. Discover a haven where
              safety, luxury, and tradition blend seamlessly for an
              unforgettable stay.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 pr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.9997 15.1709L19.1927 5.97891L20.6077 7.39291L9.9997 18.0009L3.63574 11.6369L5.04974 10.2229L9.9997 15.1709Z"></path>
                  </svg>
                  <p className="text-amber-500">
                    Guaranteed comfort and security with 24/7 customer support
                    for an effortless stay.
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 pr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.9997 15.1709L19.1927 5.97891L20.6077 7.39291L9.9997 18.0009L3.63574 11.6369L5.04974 10.2229L9.9997 15.1709Z"></path>
                  </svg>
                  <p className="text-amber-500">
                    Premium amenities designed to enhance your stay, from fine
                    dining to world-class.
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 pr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.9997 15.1709L19.1927 5.97891L20.6077 7.39291L9.9997 18.0009L3.63574 11.6369L5.04974 10.2229L9.9997 15.1709Z"></path>
                  </svg>
                  <p className="text-amber-500">
                    Exclusive rewards program that lets you enjoy special
                    discounts, priority bookings.
                  </p>
                </div>
              </div>

              {/* Repeat for other list items */}
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-3 rounded flex justify-center transition-all duration-300 cursor-pointer">
              DISCOVER MORE
            </button>
          </div>
        </div>
      </section>
      {/* Explore */}
      <section className="container mx-auto my-10 py-5">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <div className="w-full flex flex-col items-center text-center py-10">
            <span className="text-lg font-semibold text-gray-600">Explore</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 lg:tracking-widest text-indigo-700 font-serif">
              The Hotel
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover the refined elegance of Hilaac Hotel, where luxury and
              comfort come together to create an unforgettable experience.
              Nestled in the heart of Hargeisa, our hotel offers a serene
              retreat with world-class amenities, exquisite dining, and
              unparalleled hospitality. Whether you're here for business or
              leisure, we ensure every moment is tailored to perfection.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 justify-center my-5 py-3 px-4">
            {/* Card 1 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-1.png"
                  alt="card 1"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Quality Room</h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  Discover our Quality Rooms, where comfort meets contemporary
                  elegance. Enjoy plush bedding, modern amenities, and a serene,
                  restorative escape.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-2.png"
                  alt="card 2"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Private Beach</h3>
                <p className="text-gray-600 text-center mb-4">
                  Relax at our Private Beach, a secluded retreat offering
                  timeless luxury and serenity. Unwind with calm views, gentle
                  waves, and an exclusive seaside escape.
                </p>

                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-3.png"
                  alt="card 3"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Best Accommodation</h3>
                <p className="text-gray-600 text-center mb-4">
                  Experience refined comfort in our exclusive accommodations,
                  where modern design meets timeless elegance. Enjoy a stay
                  defined by thoughtful details.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-4.png"
                  alt="card 4"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Wellness & Special</h3>
                <p className="text-gray-600 text-center mb-4">
                  Indulge in exclusive wellness amenities and special treatments
                  crafted for your well-being. Rejuvenate your mind and body
                  with personalized care and attention.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-5.png"
                  alt="card 5"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Restaurant & Teashops</h3>
                <p className="text-gray-600 text-center mb-4">
                  Savor gourmet dishes at our in-house restaurant and enjoy
                  artisan teas in cozy teashops. Experience culinary delights
                  paired with a warm, inviting atmosphere.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="w-full">
              <div className="explore_cards">
                <img
                  src="images/explore-icon-6.png"
                  alt="card 6"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3>Special Offers</h3>
                <p className="text-gray-600 text-center mb-4">
                  Take advantage of our seasonal special offers designed for
                  discerning guests. Enjoy exclusive deals and unique perks
                  tailored for an unforgettable experience.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      .{/* Rooms */}
      <section className="container mx-auto py-5 border-gray-200">
        <div className="flex flex-col ">
          <div className="w-full flex flex-col items-center text-center py-10">
            <span className="text-lg font-semibold text-gray-600">
              The pleasure of Luxury{" "}
            </span>
            <h2 className="text-5xl font-extrabold tracking-widest my-5 text-indigo-700 font-serif">
              {" "}
              Rooms & Suites
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Experience the perfect blend of modern sophistication and timeless
              allure in our Rooms & Suites. Each space is thoughtfully designed
              with elegant touches and contemporary comforts, creating an
              inviting haven for relaxation and indulgence.
            </p>
          </div>
          <RoomsdataFetching />
        </div>
      </section>
      {/* Resort */}
      <section className="container mx-auto my-15 ">
        <div className="flex relative">
          <img
            src="/images/bg-2.png"
            alt="bg-2"
            className="absolute inset-0 -z-10"
          />
          <div className=" flex flex-col md:flex-row items-center p-3 md:p-5 lg:p-8 w-full">
            <div className=" w-full md:w-1/2 lg:w-5/12 image-wrapper mb-6 md:mb-0">
              <img
                src="/images/feature.png"
                alt="feature"
                className="w-full md:h-auto shadow-md rounded-lg object-cover"
                style={{ minHeight: "400px" }}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-7/12 md:ps-5 lg:ps-8 text-wrapper resort-content">
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                Luxury Hotel & Resort
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-indigo-700  font-bold font-serif mt-2 mb-4">
                Pearl Of The Adriatic
              </h2>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                Nestled along the breathtaking Adriatic coast, our luxury resort
                offers a sanctuary of elegance and relaxation. Immerse yourself
                in the beauty of pristine surroundings and world-class
                hospitality.
              </p>

              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
                Whether seeking a peaceful retreat or an adventurous getaway,
                every corner of our resort is designed to inspire. Experience
                unmatched comfort, stunning ocean views, and indulgent
                amenities.
              </p>

              <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out cursor-pointer">
                <Link href="/discover">DISCOVER MORE</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Prices */}
      <section className="container mx-auto relative py-7 md:py-10 lg:py-15 my-10  bg-gray-100 overflow-hidden rounded">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* first Column - Text Content */}
            <div className="lg:w-1/4 shadow-[4px_4px_0px_rgba(63,63,156,0.2)] hover:shadow-[4px_4px_0px_rgba(63,63,156,0.8)]  transition-shadow duration-300 rounded">
              <div className="mb-6">
                <span className="inline-block bg-indigo-100 text-indigo-600 font-semibold rounded-full px-3 py-1 text-sm mb-2">
                  Best Prices
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Extra Service
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Enjoy premium services at unbeatable prices, ensuring every stay
                is effortless and memorable. From personalized concierge
                assistance to exclusive guest perks, we cater to your needs.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you desire a lavish experience or thoughtful
                conveniences, our extra services enhance every moment. Indulge
                in tailored hospitality designed for comfort, luxury, and
                absolute satisfaction.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Box 1 */}
              <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 relative">
                <div className="mb-4">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Room Cleaning
                    </h3>
                    <p className="text-sm text-gray-500">
                      Perfect for early-stage startups
                    </p>
                  </div>
                  <span className="inline-block bg-green-100 text-green-600 font-semibold rounded-full px-2 py-1 text-xs">
                    Monthly
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-indigo-700 mb-4">
                  $59.99
                </h1>
                <p className="mt-4 text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Fresh rooms with daily cleaning.
                </p>
                <p className="text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Premium sanitation for spotless comfort.
                </p>
                <p className="text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Hassle-free housekeeping every day.
                </p>
                <button className="absolute bottom-0 left-0 w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-b-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out cursor-pointer">
                  GET STARTED
                </button>
              </div>

              {/*  a second price box */}
              <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 relative">
                <div className="mb-4">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Drinks included
                    </h3>
                    <p className="text-sm text-gray-500">
                      Great for growing businesses
                    </p>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-600 font-semibold rounded-full px-2 py-1 text-xs">
                    Monthly
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-blue-700 mb-4">
                  $69.99
                </h1>
                <p className="mt-4 text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Complimentary drinks in your stay.
                </p>
                <p className="text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Fresh juices and handcrafted cocktails.
                </p>
                <p className="text-gray-600 flex items-center leading-8">
                  <img
                    src="/images/check-icon.png"
                    alt="check_icon"
                    className="w-5 h-5 mr-2"
                  />
                  Curated choices for refreshing enjoyment.
                </p>
                <button className="absolute bottom-0 left-0 w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-b-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out cursor-pointer">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial */}
      <section className="container mx-auto py-16 bg-gray-50">
        <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <small className="uppercase text-yellow-500 font-bold tracking-wide">
              Testimonial
            </small>
            <h2 className="text-3xl font-extrabold text-indigo-700 font-serif sm:text-4xl lg:text-5xl mt-3">
              What Our Client Says
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our guests rave about their unforgettable experiences, from
              exceptional service to breathtaking views. Every stay is crafted
              with comfort, elegance, and personalized care, ensuring
              satisfaction beyond expectations.
            </p>
          </div>

          <div>
            <TestimonialSwiper />
          </div>
        </div>
      </section>
      {/* Book Room */}
      <section className="container mx-auto py-16 bg-gray-200 rounded">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 ">
            {/* Left Column - Booking Form */}
            <div className="lg:w-5/12 flex flex-col w-full  ">
              <div className="mb-6">
                <span className="inline-block text-gray-600 font-semibold mb-2">
                  Make Appointment
                </span>
                <h2 className="text-5xl font-serif text-indigo-700 font-bold ">
                  Book A Room
                </h2>
              </div>
              <form action="/" className="space-y-4 ">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <i>Check In Date</i>
                    </label>
                    <input
                      type="date"
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <i>Check Out Date</i>
                    </label>
                    <input
                      type="date"
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12 18a3 3 0 01-3-3 3 3 0 016 0 3 3 0 01-3 3z" />
                        <path
                          fillRule="evenodd"
                          d="M6 14a1 1 0 001 1h6a1 1 0 001-1v-1a1 1 0 00-1-1H7a1 1 0 00-1 1v1zm-2 3a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Adults
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      <option>Adults</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Room
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      <option>Room</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suites">Suites</option>
                    </select>
                  </div>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 cursor-pointer">
                  <Link href="/rooms">BOOK NOW</Link>
                </button>
              </form>
            </div>

            <div className="lg:w-1/2">
              <img
                src="/images/booking.png"
                alt="Book a room"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Blogs*/}
      <section className="container mx-auto py-20 bg-gray-100 mt-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-gray-600 font-semibold mb-2">
              Our Latest Stories
            </span>
            <h2 className="text-3xl font-bold text-indigo-700 font-serif  md:text-4xl lg:text-5xl">
              Discover Our World
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Explore the latest news, travel tips, and exclusive insights from
              Luxuri Hotel. Stay informed and inspired for your next getaway.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
              <Link href="/blog/readmore" className="block">
                <img
                  src="/images/blog-1.jpg" // Replace with your blog image
                  alt="Serene Mountain Retreat"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full px-2 py-1 mb-2">
                    Travel
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300 mb-2">
                    Escape to the Serene Mountain Retreat
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Unwind amidst breathtaking mountain views, enjoy cozy
                    accommodations, and indulge in nature's tranquility.
                  </p>
                  <div className="flex items-center text-gray-500 text-xs mb-10">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Published on October 26, 2024</span>
                  </div>
                  <button
                    type="submit"
                    className="text-blue-500 underline cursor-pointer "
                  >
                    Read More
                  </button>
                </div>
              </Link>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
              <Link href="/blog/readmore" className="block">
                <img
                  src="/images/blog-2.jpg" // Replace with your blog image
                  alt="Culinary Delights Await"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full px-2 py-1 mb-2">
                    Food & Drink
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-300 mb-2">
                    Savor the Culinary Delights at Luxuri
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Experience exquisite dining with our locally sourced
                    ingredients and innovative menu crafted by top chefs menu
                    crafted by top chefs menu crafted by top chefs menu crafted
                    by top chefs.
                  </p>
                  <div className="flex items-center text-gray-500 text-xs mb-10 ">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Published on November 15, 2024</span>
                  </div>
                  <button
                    type="submit"
                    className="text-blue-500 underline cursor-pointer "
                  >
                    Read More
                  </button>
                </div>
              </Link>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-400 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
              <Link href="/blog/readmore" className="block">
                <img
                  src="/images/blog-3.jpg"
                  alt="Relaxing Spa Experience"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold rounded-full px-2 py-1 mb-2">
                    Wellness
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300 mb-2">
                    Indulge in a Relaxing Spa Experience
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Rejuvenate your mind and body with our luxurious spa
                    treatments designed to melt away stress and enhance your
                    well-being menu crafted by top chefs menu crafted by top
                    chefs.
                  </p>
                  <div className="flex items-center text-gray-500 text-xs mb-10">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Published on December 03, 2024</span>
                  </div>
                  <button
                    type="submit"
                    className="text-blue-500 underline cursor-pointer  "
                  >
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog" // Replace with your actual blog page URL
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
            >
              View All Blog Posts
            </Link>
          </div>
        </div>
      </section>
      {/* Banner */}
      <Banner />
    </main>
  );
}
