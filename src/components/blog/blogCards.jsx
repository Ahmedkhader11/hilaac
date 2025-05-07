import Link from "next/link";

const BlogCard = ({ image, category, title, description, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 relative cursor-pointer hover:transform hover:transition-transform hover:scale-104">
      <Link href="/blog/readmore" className="block">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <span
            className={`inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-2 py-1 mb-2`}
          >
            {category}
          </span>
          <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
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
            <span>{date}</span>
          </div>
          <button className="text-blue-500 underline cursor-pointer">
            Read More
          </button>
        </div>
      </Link>
    </div>
  );
};

export { BlogCard };
