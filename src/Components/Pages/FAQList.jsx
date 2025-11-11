import React from "react";
import FAQItem from "./FAQItem";

const FAQs = [
  {
    question: "How do I create a StudyMate profile?",
    answer:
      "Go to the Create Partner page, fill out your details, and click 'Create Profile'.",
  },
  {
    question: "Can I study with multiple partners at the same time?",
    answer:
      "Yes, you can send requests to multiple partners and connect with more than one.",
  },
  {
    question: "Is StudyMate free to use?",
    answer:
      "Yes, creating a profile, finding partners, and connecting is completely free.",
  },
  {
    question: "How do I update my profile information?",
    answer:
      "Go to 'My Connections' or 'My Profile', click update, make changes, and save.",
  },
];

const FAQList = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
      Frequently Asked Questions
    </h2>
    <div className="space-y-4">
      {FAQs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  </div>
);

export default FAQList;
