import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiousSecure from "../Hooks/useAxiousSecure";
import { AuthContex } from "../AuthContex/AuthContex";
import { toast } from "react-hot-toast";
import axios from "axios";

const PartnerDetails = () => {
  const { _id: partnerId } = useLoaderData();
  const axiosSecure = useAxiousSecure();
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch partner details
  useEffect(() => {
    if (!partnerId) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/user/${partnerId}`)
      .then((res) => setPartner(res.data))
      .catch((err) => toast.error(`Failed to load partner details ${err.message}`))
      .finally(() => setLoading(false));
  }, [partnerId]);

  // Send partner request
  const handleSendRequest = async () => {
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    try {
      setSending(true);

      
      await axiosSecure.patch(`/user/${partnerId}/increase-partner`);

    
      const requestData = {
        partnerId,
        partnerName: partner?.name,
        partnerEmail: partner?.email,
        partnerPhotoURL:partner?.profileimage,
        userEmail: user.email,
        timestamp: new Date(),
      };
      await axiosSecure.post("/partner-request", requestData);

     
      setPartner((prev) => ({
        ...prev,
        partnerCount: (prev.partnerCount || 0) + 1,
      }));

      toast.success("Partner request sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request!");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (!partner)
    return (
      <div className="text-center mt-10 text-gray-600">
        ❌ Partner not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 pb-10">
      <div className="flex flex-col items-center">
        <img
          src={partner.profileimage}
          alt={partner.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-100 shadow-sm"
        />
        <h2 className="text-2xl font-bold text-indigo-700">{partner.name}</h2>
        <div className="flex items-center mt-2 gap-1 text-yellow-500">
          <span>★</span>
          <span className="font-semibold text-gray-700">
            {partner.rating ? parseFloat(partner.rating).toFixed(1) : "N/A"}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-gray-700">
        <p>
          <strong> Subject:</strong> {partner.subject}
        </p>
        <p>
          <strong> Study Mode:</strong> {partner.studyMode || "Not specified"}
        </p>
        <p>
          <strong> Availability:</strong>{" "}
          {partner.availability || "Not specified"}
        </p>
        <p>
          <strong> Location:</strong> {partner.location || "Not provided"}
        </p>
        <p>
          <strong> Experience Level:</strong> {partner.experience}
        </p>
        <p>
          <strong> Partner Count:</strong> {partner.partnerCount || 0}
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSendRequest}
          className="btn btn-primary"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Partner Request"}
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
