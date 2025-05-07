import Image from "next/image";
import Link from "next/link";

export default function DiscoverMore() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center py-16 text-white min-h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-1.png')" }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h2 className="text-5xl font-extrabold">Discover More</h2>
          <p className="mt-3 text-lg">
            Dive into the world of luxury, where every detail is designed for
            perfection.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto mt-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-700">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We redefine luxury with stunning views, impeccable service, and
          unforgettable experiences.
        </p>
      </section>

      {/* Image Gallery with Descriptions */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="relative">
          <Image
            src="/images/discover-5.png"
            alt="Resort View"
            width={400}
            height={250}
            className="rounded-lg shadow-lg"
          />
          <p className="absolute bottom-(-16) left-0 bg-black bg-opacity-70 text-white text-sm py-4 rounded">
            🌅 Stunning ocean-view resort, where elegance meets tranquility.
          </p>
        </div>

        <div className="relative">
          <Image
            src="/images/discover-6.png"
            alt="Luxury Suite"
            width={400}
            height={250}
            className="rounded-lg shadow-lg"
          />
          <p className="absolute bottom-(-16) left-0 bg-black bg-opacity-70 text-white py-4  text-sm rounded">
            🛏️ Experience comfort in our sophisticated, modern luxury suites.
          </p>
        </div>

        <div className="relative">
          <Image
            src="/images/discover-4.png"
            alt="Poolside Bliss"
            width={400}
            height={250}
            className="rounded-lg shadow-lg"
          />
          <p className="absolutebottom-(-16) left-0 bg-black bg-opacity-70 text-white py-4  text-sm right-0 rounded">
            🏖️ Relax by the infinity pool, surrounded by breathtaking views.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-700">
          What Our Guests Say
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          "This was the best experience of our lives—five-star service and
          breathtaking views!"
        </p>
        <span className="text-gray-500 italic">- Happy Traveler</span>
      </div>

      {/* CTA Section */}
      <div className="mt-12 flex justify-center">
        <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 px-10 rounded-md shadow-md transition duration-300 ease-in-out cursor-pointer">
          <Link href="/rooms">Book Your Stay</Link>
        </button>
      </div>
    </>
  );
}
