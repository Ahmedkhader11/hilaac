export async function GET(_req) {
  const testimonials = [
    {
      imageSrc: "/images/test-1.png",
      name: "Abdishakour Eid",
      role: "Client",
      rating: 5,
      review:
        "Amazing service! The attention to detail was outstanding, and the staff went above and beyond to ensure a comfortable stay. Would definitely stay again and highly recommend it!",
    },
    {
      imageSrc: "/images/test-2.png",
      name: "Abdihamid Abdillahi",
      role: "Customer",
      rating: 4,
      review:
        "Great atmosphere and hospitality! The serene surroundings and well-designed spaces created an inviting experience. A few improvements could elevate the service, but overall, a fantastic stay.",
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Ahmed Khader",
      role: "User",
      rating: 3,
      review:
        "Good experience, though some aspects could be refined. The room was comfortable, and service was decent, but a few inconsistencies in response times affected the overall enjoyment.",
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Subeer Awal",
      role: "Customer",
      rating: 5,
      review:
        "Best hotel experience! The perfect combination of luxury, comfort, and seamless service made my stay unforgettable. Every detail was executed flawlessly, making me eager to return.",
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Abdiqadir Dayib",
      role: "Customer",
      rating: 4,
      review:
        "Lovely staff and great amenities! The warm welcome and attention to guest needs made this visit truly pleasant. Some minor adjustments could further enhance the experience.",
    },
    {
      imageSrc: "/images/test-3.png",
      name: "Shucayb Harun",
      role: "Customer",
      rating: 5,
      review:
        "Absolutely wonderful stay! Every detail, from the ambiance to the personalized service, contributed to a flawless experience. I couldn't have asked for a more memorable getaway.",
    },
  ];

  return Response.json(testimonials);
}
