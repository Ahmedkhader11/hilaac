import { blogPosts } from "@/utils/blogs";
import Link from "next/link";

export default function BlogPostPage({ params }) {
  const blog = blogPosts.find((post) => post.id === params.id);

  if (!blog)
    return <p className="text-center text-red-500">Blog post not found.</p>;

  return (
    <div className="container mx-auto py-10 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">{blog.title}</h1>
      <p className="text-gray-500 italic">Published on {blog.date}</p>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mt-4"
      />
      <p className="text-lg text-gray-700 leading-relaxed mt-6">
        {blog.content}
      </p>
      <Link href="/blog" className="mt-6 block text-indigo-600 hover:underline">
        ← Back to Blog
      </Link>
    </div>
  );
}
