import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";

const AdminPage = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [searchPin, setSearchPin] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // Fetch all pending withdrawal requests
  const fetchWithdrawalRequests = async () => {
    try {
      const response = await axiosInstance.get("/auth/withdrawal-requests");
      if (response.data.success) {
        setWithdrawalRequests(response.data.data);
      } else {
        toast.error("Failed to fetch withdrawal requests.");
      }
    } catch (err) {
      console.error("Failed to fetch withdrawal requests:", err);
      toast.error("Failed to fetch withdrawal requests. Please try again.");
    }
  };

  // Handle withdrawal request status update (accept/reject)
  const handleUpdateStatus = async (requestId, status) => {
    try {
      const response = await axiosInstance.put(
        `/auth/withdrawal-requests/${requestId}`,
        {
          status,
        }
      );

      if (response.data.success) {
        toast.success(`Withdrawal request ${status} successfully.`);
        fetchWithdrawalRequests(); // Refresh the list
      } else {
        toast.error(
          response.data.message || "Failed to update withdrawal request."
        );
      }
    } catch (err) {
      console.error("Failed to update withdrawal request:", err);
      toast.error("Failed to update withdrawal request. Please try again.");
    }
  };

  // Search user by PIN
  const handleSearchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/search-user", {
        params: { pin: searchPin },
      });

      if (response.data.success) {
        setUserInfo(response.data.data);
      } else {
        toast.error(response.data.message || "User not found.");
      }
    } catch (err) {
      console.error("Failed to search user:", err);
      toast.error("Failed to search user. Please try again.");
    }
  };

  // Fetch withdrawal requests on component mount
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer />

      {/* Page Header */}
      <h1 className="text-2xl font-bold text-black mb-6">Admin Dashboard</h1>

      {/* Search User by PIN */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchPin}
            onChange={(e) => setSearchPin(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter user PIN"
          />
          <button
            onClick={handleSearchUser}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Display User Info */}
        {userInfo && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-red-500 font-bold">User Information</h2>
            <p className=" text-green-500 font-bold">
              Name: {userInfo.fullName}
            </p>
            <p className=" text-green-500 font-bold">Email: {userInfo.email}</p>
            <p className=" text-green-500 font-bold">PIN: {userInfo.pin}</p>
            <p className=" text-green-500 font-bold">Coins: {userInfo.coin}</p>
          </div>
        )}
      </div>

      {/* Withdrawal Requests */}
      <div>
        <h2 className="text-xl text-blue-600 font-bold mb-4">
          Withdrawal Requests
        </h2>
        {withdrawalRequests.length > 0 ? (
          withdrawalRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
            >
              <p>User: {request.userId.fullName}</p>
              <p>User Pin: {request.userId.pin}</p>
              <p>Bkash Number: {request.bkashNumber}</p>
              <p>Coins: {request.coin}</p>
              <p>Status: {request.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleUpdateStatus(request._id, "approved")}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(request._id, "rejected")}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending withdrawal requests.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
