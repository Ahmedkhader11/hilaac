import Newsletter from "@/components/about/newLetter";
import Link from "next/link";
Link;
const About = () => {
  return (
    <>
      <section
        className="bg-cover bg-center py-16 text-white min-h-[400px]"
        style={{ backgroundImage: "url('/images/about-1.png')" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <div className="text-center">
              {/* Section Title */}
              <div className="mb-6">
                <h2 className="text-5xl font-extrabold">About Us</h2>
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
                    <span className="font-bold text-yellow-300">About Us</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About section */}
      <section className="container mx-auto my-20 py-5">
        <div className="container mx-auto max-w-screen px-4 flex flex-col lg:flex-row gap-6 justify-between items-center flex-wrap lg:flex-nowrap pb-10">
          {/* Image Container */}
          <div className="w-full mx-auto flex-1/3 lg:w-1/2 relative pr-20 mt-4">
            <img
              src="/images/about-1.png"
              alt="hotel_img"
              className="w-full h-auto shadow-lg rounded-lg"
            />
            <img
              src="/images/about-2.png"
              alt="bedroom_img"
              className="absolute bottom-0 right-0 w-1/2 shadow-lg p-1 bg-white rounded-lg -translate-x-12"
            />
          </div>

          {/* Text Content */}
          <div className="w-full flex-1/2 lg:w-1/2 pl-10">
            <div className="mb-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                About Us
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4 text-indigo-700">
                Most Safe & Rated <br /> Hotel In Hargeisa
              </h2>
            </div>

            <p className="text-gray-800 mb-4 dark:text-gray-400">
              Welcome to our hotel, where comfort meets elegance. Located in the
              heart of Hargeisa, we offer unparalleled service and a memorable
              stay.
            </p>

            <p className="text-gray-800 mb-6 dark:text-gray-400">
              Whether you’re here for business or leisure, our dedicated staff
              ensures your satisfaction. Enjoy luxurious rooms, top-notch
              amenities, and a relaxing ambiance.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex flex-col text-amber-700 dark:text-amber-300">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 pr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.9997 15.1709L19.1927 5.97891L20.6077 7.39291L9.9997 18.0009L3.63574 11.6369L5.04974 10.2229L9.9997 15.1709Z"></path>
                  </svg>
                  <p>24-Month / 24,000 KM Nationwide Warranty</p>
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
                  <p>Customized Experiences Tailored to Your Needs</p>
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
                  <p>Exclusive Rewards Program for Loyal Guests</p>
                </div>
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-3 rounded flex justify-center transition-all duration-300 cursor-pointer">
              <Link href={"#"}>DISCOVER MORE</Link>
            </button>
          </div>
        </div>

        {/* Additional Section */}
        <div className="container mx-auto max-w-screen px-4 mt-10">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Why Choose Us?
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-100 p-6 shadow-md rounded-lg w-64">
              <h4 className="text-lg font-semibold mb-2">Prime Location</h4>
              <p className="text-gray-600">
                Situated in the heart of Hargeisa, enjoy seamless access to
                attractions and services.
              </p>
            </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg w-64">
              <h4 className="text-lg font-semibold mb-2">World-Class Dining</h4>
              <p className="text-gray-600">
                Indulge in gourmet dishes crafted by our top chefs.
              </p>
            </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg w-64">
              <h4 className="text-lg font-semibold mb-2">Unmatched Comfort</h4>
              <p className="text-gray-600">
                Experience luxurious rooms and amenities designed for
                relaxation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* progress section*/}
      <section className="container mx-auto  bg-gray-100 ">
        <h1 className=" text-lg pt-10 text-indigo-600 leading-12 font-bold text-center">
          What We Offer
        </h1>
        <div className="flex flex-wrap lg:flex-nowrap   py-7">
          <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 sm:py-2 lg:py-4  bg-indigo-700">
            <div className="text-start mb-12">
              <h2 className="text-3xl font-bold font-serif  text-white md:text-4xl">
                We Offer Wide <br /> Selection of Hotel Services
              </h2>
              <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
                Discover exceptional services crafted to meet your needs. From
                quality production to reliable maintenance, we ensure
                excellence.
              </p>
            </div>
            <div className="space-y-8 pb-4">
              {/* Progress Item */}
              <div className="progress-item">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-200">
                    Quality Production
                  </span>
                  <span className="text-gray-200">90%</span>
                </div>
                <div className="w-full bg-gray-300 h-4 rounded-full mt-2">
                  <div
                    className="bg-amber-700 h-4 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-200">
                    Maintenance Services
                  </span>
                  <span className="text-gray-200">50%</span>
                </div>
                <div className="w-full bg-gray-300 h-4 rounded-full mt-2">
                  <div
                    className="bg-amber-700 h-4 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-200">
                    Product Management
                  </span>
                  <span className="text-gray-200">70%</span>
                </div>
                <div className="w-full bg-gray-300 h-4 rounded-full mt-2">
                  <div
                    className="bg-amber-700  h-4 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              className=" shadow-lg max-w-full h-full"
              src="/images/progress.png"
              alt="Hotel Services Overview"
            />
          </div>
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
          <div className="ring flex flex-col md:flex-row items-center p-3 md:p-5 lg:p-8 w-full">
            <div className="ring w-full md:w-1/2 lg:w-5/12 image-wrapper mb-6 md:mb-0">
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif mt-2 mb-4">
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
      {/* Bolg */}
      <section className="container mx-auto   py-10 bg-gray-100 mt-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-indigo-600 font-semibold mb-2">
              Our Latest Stories
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Discover Our World
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Explore the latest news, travel tips, and exclusive insights from
              Luxuri Hotel. Stay informed and inspired for your next getaway.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-400 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
              <Link href="#" className="block">
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
            <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-400 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
              <Link href="#" className="block">
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
              <Link href="#" className="block">
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
      {/* NewsLetter */}
      <Newsletter />
    </>
  );
};

export default About;
