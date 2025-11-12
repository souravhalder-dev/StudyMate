import React, { useEffect, useState } from "react";

import useAxiousSecure from "../Hooks/useAxiousSecure";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown } from "lucide-react";

const FindPartners = () => {
  const axiosSecure = useAxiousSecure();

  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

 
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/user")
      .then((res) => {
        setPartners(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, setLoading]);

  
  const filteredPartners = partners
    .filter((p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  const handleViewProfile = (id) => {
    navigate(`/partner/${id}`);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading partners...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
      
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleSort}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowUpDown size={18} />
            Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
          </button>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none text-sm"
            />
          </div>
        </div>

       
        {filteredPartners.length === 0 ? (
          <p className="text-center text-gray-500">No partners found.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {filteredPartners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={partner.profileimage}
                    alt={partner.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Subject: {partner.subject || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Study Mode: {partner.studyMode || "Flexible"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Experience: {partner.experience || "Beginner"}
                  </p>
                  <button
                    onClick={() => handleViewProfile(partner._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPartners;
