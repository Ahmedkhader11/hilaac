"use client";
import OurRoomsPage from "@/components/ourRooms/roomsdatafetching";
import Link from "next/link";
import React from "react";

const Rooms = () => {
  return (
    <>
      {/* page Section */}
      <section
        className="bg-cover bg-center py-16 text-white min-h-[400px]"
        style={{ backgroundImage: "url('/images/feature.png')" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <div className="text-center">
              {/* Section Title */}
              <div className="mb-6">
                <h2 className="text-5xl font-extrabold text-indigo-700 font-serif">
                  Our Rooms
                </h2>
              </div>

              {/* Navigation Links */}
              <div className="flex justify-center items-center space-x-4">
                <ul className="flex items-center space-x-4 text-lg">
                  <li>
                    <Link
                      href="/"
                      className="hover:underline hover:text-yellow-300 transition-all"
                    >
                      Home
                    </Link>
                    &nbsp; /&nbsp;
                    <span className="font-bold text-yellow-300">Rooms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rooms section */}
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
              Proin consectetur non dolor vitae pulbinar. Pelllentesque
              sollicutudin dolor eget neque vive,Proin consectetur non dolor
              vitae pulbinar. Pelllentesque sollicutudin dolor eget neque vive
            </p>
          </div>
          <OurRoomsPage />
        </div>
      </section>
      {/* Resort */}
      <section className="container mx-auto my-15 ">
        <div className="flex relative">
          <img
            src="/images/bg-2.png"
            alt="bg-2"
            className=" absolute inset-0 -z-10"
          />
          <div className="flex flex-col md:flex-row items-center p-3 md:p-5 lg:p-8 w-full">
            <div className="w-full md:w-1/2 lg:w-5/12 image-wrapper mb-6 md:mb-0">
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-indigo-700 font-serif">
                Pearl Of The Adriatic
              </h2>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellat soluta distinctio dignissimos nemo voluptates
                architecto assumenda nostrum ipsum earum totam!
              </p>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Deserunt ut sint sed magnam, quas possimus? Excepturi mollitia
                totam velit esse?
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out cursor-pointer">
                DISCOVER MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Book Room */}
      <section className="container mx-auto py-16 bg-gray-100 rounded">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 ">
            {/* Left Column - Booking Form */}
            <div className="lg:w-5/12 flex flex-col w-full  ">
              <div className="mb-6">
                <span className="inline-block text-gray-600 font-semibold mb-2">
                  Make Appointment
                </span>
                <h2 className="text-5xl text-indigo-700 font-serif font-bold ">
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
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 cursor-pointer"
                >
                  BOOK NOW
                </button>
              </form>
            </div>

            <div className="lg:w-1/2">
              <img
                src="/images/bookings.png"
                alt="Book a room"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;
