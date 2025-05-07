import Link from "next/link";
import { BlogCard } from "@/components/blog/blogCards";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Blog = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center py-16 text-white min-h-[400px] flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/about-1.png')" }}
      >
        <div className="text-center">
          <h2 className="text-5xl font-extrabold">Blog</h2>
          {/* Navigation Links */}
          <div className="mt-4 text-lg">
            <Link
              href="/"
              className="hover:underline hover:text-yellow-300 transition"
            >
              Home
            </Link>
            &nbsp;/&nbsp;
            <span className="font-bold text-yellow-300">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto py-20 px-6 bg-gray-100">
        <div className="text-center mb-16">
          <span className="text-gray-600 font-semibold mb-2 block">
            Our Latest Stories
          </span>
          <h2 className="text-4xl font-bold text-indigo-700 font-serif md:text-5xl">
            Discover Our World
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore travel tips, exclusive insights, and exciting experiences at
            Luxuri Hotel.
          </p>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Right Column: Blog Posts */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlogCard
              image="/images/blog-1.jpg"
              category="Travel"
              title="Escape to the Serene Mountain Retreat"
              description="Unwind amidst breathtaking mountain views, cozy accommodations, and nature’s tranquility."
              date="October 26, 2024"
            />
            <BlogCard
              image="/images/blog-2.jpg"
              category="Food & Drink"
              title="Savor the Culinary Delights at Luxuri"
              description="Experience exquisite dining with locally sourced ingredients and innovative menus."
              date="November 15, 2024"
            />
            <BlogCard
              image="/images/blog-3.jpg"
              category="Wellness"
              title="Indulge in a Relaxing Spa Experience"
              description="Rejuvenate your mind and body with our luxurious spa treatments."
              date="December 03, 2024"
            />
            <BlogCard
              image="/images/blog-4.jpg"
              category="Adventure"
              title="Thrilling Safari Experience at Luxuri"
              description="Get up close with majestic wildlife on our guided safaris."
              date="January 10, 2025"
            />
            <BlogCard
              image="/images/blog-5.jpg"
              category="Luxury Stays"
              title="Unveiling Our New Presidential Suites"
              description="Discover elegance in our high-end suites, designed for ultimate comfort."
              date="February 15, 2025"
            />
            <BlogCard
              image="/images/blog-6.jpg"
              category="Events"
              title="Behind the Scenes: Our Grand Year-End Gala"
              description="Catch magical moments from our biggest event of the year."
              date="March 01, 2025"
            />
          </div>

          {/* Left Column: Sidebar Widgets */}
          <aside className="bg-white rounded-lg shadow p-6 space-y-10">
            {/* Search Box */}
            <div>
              <h4 className="text-2xl font-semibold mb-4">Search</h4>
              <div className="flex border rounded overflow-hidden">
                <input
                  type="text"
                  className="w-full p-2 outline-none"
                  placeholder="Search..."
                />
                <button className="bg-gray-800 text-white px-4">Search</button>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Recent Posts</h5>
              <ul className="space-y-4 text-gray-600">
                <li className="border-b pb-2">
                  <p className="font-medium">
                    User Experience Psychology And Performance
                  </p>
                  <small className="block text-gray-500">August 19, 2020</small>
                </li>
                <li className="border-b pb-2">
                  <p className="font-medium">
                    Monthly Web Development Update - JavaScript Trends
                  </p>
                  <small className="block text-gray-500">August 19, 2020</small>
                </li>
                <li className="border-b pb-2">
                  <p className="font-medium">
                    Exploring Variations in Web Design Trends
                  </p>
                  <small className="block text-gray-500">August 19, 2020</small>
                </li>
              </ul>
            </div>
            {/* Follow Us Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex flex-col items-start gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <FaFacebook className="text-2xl hover:text-blue-500" />{" "}
                  Facebook
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <FaTwitter className="text-2xl hover:text-blue-400" /> Twitter
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <FaInstagram className="text-2xl hover:text-pink-500" />{" "}
                  Instagram
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <FaLinkedin className="text-2xl hover:text-blue-700" />{" "}
                  LinkedIn
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Blog;
