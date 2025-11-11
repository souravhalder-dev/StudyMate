import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Anika, Dhaka",
      text: "This platform helped me find a great study buddy for coding!",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Rahim, Chittagong",
      text: "I love how easy it is to connect with like-minded learners!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Nusrat, Khulna",
      text: "Now studying feels more fun and productive with my partner.",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <p className="italic text-gray-600 mb-4">“{review.text}”</p>
              <h4 className="font-semibold text-gray-700">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
