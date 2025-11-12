import React, { useEffect, useState, useContext } from "react";

import { AuthContex } from "../AuthContex/AuthContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopStudyPartners = () => {
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(partners);
  // Fetch top partners by rating
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://study-mate-server-ebon.vercel.app/user/top-rated")
      .then((res) => {
        // Ensure rating is always a number
        const cleanData = (res.data || []).map((p) => ({
          ...p,
          rating: p.rating ? parseFloat(p.rating) : 0,
        }));
        setPartners(cleanData);
        setLoading(false);
        console.log("Fetched Top Partners:", cleanData);
      })
      .catch((err) => {
        console.error("Error fetching partners:", err);
        setLoading(false);
      });
  }, [axios]);

  // Handle navigation to partner profile
  const handleViewProfile = (partnerId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/partner/${partnerId}`);
    }
  };

  return (
    <div className="w-full py-10 bg-gray-50">
      {/* Top Study Partners Section */}
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-indigo-700">
          Top Study Partners
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                No top partners found.
              </div>
            ) : (
              partners.slice(0, 3).map((partner) => (
                <div
                  key={partner._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <img
                    src={partner.profileimage}
                    alt={partner.name}
                    className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-indigo-100 shadow-sm"
                  />

                  <h4 className="text-lg font-semibold mb-1 text-gray-800">
                    {partner.name}
                  </h4>

                  <div className="text-sm text-gray-500 mb-2">
                    {partner.subject}
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {partner.skills?.length ? (
                      partner.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        No skills
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-bold text-gray-700">
                      {typeof partner.rating === "number"
                        ? partner.rating.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>

                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => handleViewProfile(partner._id)}
                  >
                    View Profile
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopStudyPartners;
