import React from "react";
import { Lightbulb, Search, Users } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Lightbulb size={40} className="text-blue-600" />,
      title: "Create your profile",
      desc: "Sign up and build your learning profile with your subjects and skills.",
    },
    {
      icon: <Search size={40} className="text-blue-600" />,
      title: "Search for partners",
      desc: "Browse top-rated study partners and filter by your interests.",
    },
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: "Connect and start studying",
      desc: "Send a request, chat, and start your collaborative learning journey.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
