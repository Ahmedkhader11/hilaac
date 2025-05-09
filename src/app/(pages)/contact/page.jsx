"use client";
import Link from "next/link";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center py-16 text-white min-h-[400px] flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/about-1.png')" }}
      >
        <div className="text-center">
          <h2 className="text-5xl font-extrabold">Contact</h2>
          {/* Navigation Links */}
          <div className="mt-4 text-lg">
            <Link
              href="/"
              className="hover:underline hover:text-yellow-300 transition"
            >
              Home
            </Link>
            &nbsp;/&nbsp;
            <span className="font-bold text-yellow-300">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Form & Information Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Contact Information */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-indigo-700">
                Contact Information
              </h2>
              <p className="mt-4 text-gray-600">
                Have any questions? Reach out to us and we'll get back to you
                promptly.
              </p>
            </div>
            <div className="space-y-4">
              {/* Additional Info Blocks */}
              <div className="flex flex-col  md:flex-cols gap-6 my-8">
                {/* Office Address */}
                <div className="p-4 ring ring-indigo-500 py-5 cursor-pointer shadow-lg hover:shadow-indigo-300 transition-all duration-400 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    Office Address
                  </h3>
                  <p className="mt-2 text-gray-700">
                    150 street,
                    <br />
                    Hargeisa, Somaliland
                  </p>
                </div>
                {/* Working Hours */}
                <div className="p-4 ring ring-indigo-500 py-5 cursor-pointer shadow-lg hover:shadow-indigo-300 transition-all duration-400 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    Working Hours
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Sat - Thrus: 6:00 AM - 6:00 PM
                    <br />
                    Fri: 03:00 PM - 10:00 PM
                  </p>
                </div>
                {/* Message Us */}
                <div className="p-4 ring ring-indigo-500 py-5 cursor-pointer shadow-lg hover:shadow-indigo-300 transition-all duration-400 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    Message Us
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Feel free to contact us anytime for inquiries or support.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v6a2 2 0 002 2h14a2 2 0 002-2v-6"
                  />
                </svg>
                <p className="text-gray-700">hilac@luxurihotel.com</p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a2 2 0 011.789 1.106l1.262 2.524a2 2 0 01-.464 2.283l-1.307 1.307a11.042 11.042 0 005.516 5.516l1.307-1.307a2 2 0 012.283-.464l2.524 1.262A2 2 0 0121 16.72V20a2 2 0 01-2 2h-1C10.477 22 3 14.523 3 5z"
                  />
                </svg>

                <p className="text-gray-700">+252 063-4444444</p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657a8 8 0 10-11.314 0M12 12v.01"
                  />
                </svg>
                <p className="text-gray-700">
                  150 street , Hargeisa, Somaliland
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
            {submitted ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-indigo-700">
                  Thank You!
                </h2>
                <p className="mt-4 text-gray-600">
                  Your message has been sent successfully. We will get back to
                  you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="relative text-center">
                    <h1 className="text-5xl md:text-6xl text-black  font-bold">
                      Get in Touch
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                      We’d love to hear from you!
                    </p>
                  </div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactPage;
