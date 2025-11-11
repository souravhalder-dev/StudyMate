import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <span className="text-indigo-600">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {open && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
};

export default FAQItem;
