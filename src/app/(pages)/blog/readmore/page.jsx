import React from "react";

const BlogDetail = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Image */}
        <img
          src="/images/blog-1.jpg"
          alt="Blog Title"
          className="w-full h-64 object-cover"
        />
        {/* Content Container */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Blog Title Goes Here
          </h1>
          <p className="text-gray-500 italic mb-6">
            Published on January 1, 2025 by Author Name
          </p>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed
              sem ac dui sodales egestas. Mauris vulputate purus libero, finibus
              condimentum orci rhoncus id. Integer nec ipsum quam. Sed laoreet
              velit sit amet tortor sollicitudin, at pellentesque magna
              vestibulum.
            </p>
            <p>
              Vivamus eu congue quam. Aliquam erat volutpat. Phasellus molestie
              nisl at consectetur ultrices. Cras sit amet turpis nec nisl
              aliquet tempor.
            </p>
            <p>
              Nam id massa commodo, ullamcorper massa at, pellentesque purus.
              Suspendisse potenti. Praesent ac nulla odio. Etiam non urna
              interdum, mattis eros in, semper nulla.
            </p>
          </div>
          <div className="mt-8">
            <a
              href="/blog"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              ← Back to Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
