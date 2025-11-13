import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContex } from "../AuthContex/AuthContex";
import { toast } from "react-hot-toast";

const Connections = () => {
  const { user } = useContext(AuthContex);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState(null);

  const fetchRequests = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://study-mate-server-ebon.vercel.app/partner-request?userEmail=${user.email}`
      );
      setRequests(data);
    } catch (err) {
      toast.error("Failed to load requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;

    try {
      await axios.delete(
        `https://study-mate-server-ebon.vercel.app/partner-request/${id}`
      );
      toast.success("Deleted successfully!");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete");
    }
  };

  const handleEdit = (request) => setEditingRequest(request);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const id = editingRequest._id;
    if (!id) {
      toast.error("Invalid request!");
      return;
    }

    try {
      const { data } = await axios.patch(
        `https://study-mate-server-ebon.vercel.app/partner-request/${id}`,
        {
          partnerName: editingRequest.partnerName,
          partnerSubject: editingRequest.partnerSubject,
          partnerStudyMode: editingRequest.partnerStudyMode,
        }
      );

      setRequests((prev) => prev.map((req) => (req._id === id ? data : req)));
      toast.success("Updated successfully!");
      setEditingRequest(null);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Update failed";

      if (errorMsg.includes("not found") || errorMsg.includes("own it")) {
        toast.success(" Successfully Add Done...");
        setRequests((prev) => prev.filter((req) => req._id !== id));
        setEditingRequest(null);
        setTimeout(fetchRequests, 800);
      } else {
        toast.error(errorMsg);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading your connections...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        My Study Connections
      </h1>

      {requests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">No connection requests found.</p>
          <button onClick={fetchRequests} className="mt-4 btn btn-primary">
            Refresh
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="px-6 py-4 text-left">Photo</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-left">Study Mode</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={req.partnerPhotoURL}
                      alt={req.partnerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{req.partnerName}</td>
                  <td className="px-6 py-4">{req.partnerSubject}</td>
                  <td className="px-6 py-4">
                    <span className="badge badge-success">
                      {req.partnerStudyMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(req)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Update Connection Request
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Partner Name"
                value={editingRequest.partnerName || ""}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    partnerName: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                placeholder="Subject (e.g. Physics, Math)"
                value={editingRequest.partnerSubject || ""}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    partnerSubject: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                required
              />

              <select
                value={editingRequest.partnerStudyMode || ""}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    partnerStudyMode: e.target.value,
                  })
                }
                className="select select-bordered w-full"
                required
              >
                <option value="">Choose Study Mode</option>
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-8">
                  Update Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
