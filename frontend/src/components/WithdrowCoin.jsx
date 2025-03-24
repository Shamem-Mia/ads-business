import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

const WithdrawComponent = () => {
  const { authUser } = useAuthStore(); // Get the authenticated user
  const [userPin, setUserPin] = useState(""); // State for PIN input
  const [bkashNumber, setBkashNumber] = useState(""); // State for Bkash number input

  // Handle withdrawal request
  const handleWithdraw = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!userPin || !bkashNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (userPin.length !== 5) {
      toast.error("PIN must be 5 digits.");
      return;
    }

    if (bkashNumber.length !== 11) {
      toast.error("Bkash number must be 11 digits.");
      return;
    }

    try {
      // Send withdrawal request to the backend
      const response = await axiosInstance.post("/auth/withdraw", {
        userId: authUser._id,
        userPin,
        bkashNumber,
        coin: authUser.coin, // Send the user's total coin balance
      });

      if (response.data.success) {
        toast.success("Withdrawal request submitted successfully!");
        setUserPin("");
        setBkashNumber("");
      } else {
        toast.error(
          response.data.message || "Failed to submit withdrawal request."
        );
      }
    } catch (error) {
      console.error("Failed to submit withdrawal request:", error);

      if (
        error.response?.data?.message === "Withdraw request is already sent."
      ) {
        toast.error("Withdraw request is already sent.");
      } else {
        toast.error("Failed to submit withdrawal request. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Toast Container */}
      <ToastContainer />

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Withdraw Coins</h1>
        {/* Total Coin Display */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
          <span className="text-2xl text-black font-semibold">
            Total Coins:
          </span>
          <span className="text-xl font-bold text-blue-500">
            {authUser.coin}
          </span>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <form onSubmit={handleWithdraw}>
          {/* PIN Input */}
          <div className="mb-4">
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700"
            >
              User PIN Number
            </label>
            <input
              type="password"
              id="pin"
              value={userPin}
              onChange={(e) => setUserPin(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your 5-digit PIN"
              maxLength={5}
              required
            />
          </div>

          {/* Bkash Number Input */}
          <div className="mb-6">
            <label
              htmlFor="bkashNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bkash Number
            </label>
            <input
              type="text"
              id="bkashNumber"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your 11-digit Bkash number"
              maxLength={11}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Request Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawComponent;
