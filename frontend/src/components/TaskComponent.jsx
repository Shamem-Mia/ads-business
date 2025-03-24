import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import TaskShow from "./TaskShow";
import DirectAdsShow from "./DirectAdsShow";

const TaskComponent = ({ adminPopups = [] }) => {
  const { authUser } = useAuthStore();
  const [popups, setPopups] = useState([]);
  const [coins, setCoins] = useState(0);

  // Initialize popups with adminPopups
  useEffect(() => {
    if (adminPopups.length > 0) {
      setPopups(adminPopups);
    }
  }, [adminPopups]);

  // Function to fetch the latest coin balance from the backend
  const fetchCoinBalance = async () => {
    try {
      const response = await axiosInstance.get("/auth/coin-balance", {
        params: { userId: authUser._id }, // Send the user ID to fetch the coin balance
      });

      if (response.data.success) {
        setCoins(response.data.coin); // Update the coin balance in the state
      } else {
        toast.error("Failed to fetch coin balance.");
      }
    } catch (error) {
      console.error("Failed to fetch coin balance", error);
      toast.error("Failed to fetch coin balance. Please try again.");
    }
  };

  // Start polling when the component mounts
  useEffect(() => {
    fetchCoinBalance(); // Fetch coin balance immediately when the component mounts

    const pollingInterval = setInterval(fetchCoinBalance, 1000); // Poll every 1 second

    return () => clearInterval(pollingInterval); // Clean up the interval when the component unmounts
  }, [authUser._id]); // Re-run effect if the user ID changes

  // Handle popup click
  const handlePopupClick = async (_id, e) => {
    e.preventDefault();

    const popup = popups.find((p) => p._id === _id);
    if (!popup || !popup.visible) return;

    // Try to open the link in a new tab
    const newWindow = window.open(popup.link, "_blank");

    // If the new window is blocked, show a toast message
    if (!newWindow) {
      toast.error("Popup blocked! Please allow popups for this site.");
      return;
    }

    // Start the timer and log the start time
    const startTime = Date.now();
    const timer = setTimeout(async () => {
      // If the user stays on the ad page for more than 8 seconds, increment coins
      setCoins((prev) => {
        const newCoinBalance = prev + 1;

        // Send a request to update the user's coin balance in the backend
        axiosInstance.put("/auth/coin-update", {
          userId: authUser._id,
          coin: newCoinBalance,
        });

        return newCoinBalance; // Update the local state
      });
    }, 8000);

    // Handle user returning before 8 seconds
    const handleReturn = () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000; // Convert to seconds

      clearTimeout(timer);

      if (timeSpent < 8) {
        toast.info(
          `You returned too soon! No coins earned. Time spent: ${timeSpent.toFixed(
            2
          )} seconds.`
        );
      } else {
        toast.success("You earned a coin for staying more than 8 seconds!");
      }
    };

    // Listen for the user returning to the page
    window.addEventListener("focus", handleReturn, { once: true });

    // Hide the popup for the current user for 2 hours
    try {
      await axiosInstance.put(`/admin/popups/${_id}`, {
        userId: authUser._id, // Pass the user ID
      });

      // Update the local state
      setPopups((prev) =>
        prev.map((p) => (p._id === _id ? { ...p, visible: false } : p))
      );
    } catch (err) {
      console.error("Failed to update popup", err);
      toast.error("Failed to update popup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Toast Container */}
      <ToastContainer />

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Click and Earn
      </h1>

      {/* Coin Display Box */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center space-x-2 mb-6">
        <span className="text-2xl text-black font-semibold">Coins Earned:</span>
        <span className="text-xl font-bold text-blue-500">{coins}</span>
      </div>

      {/* Tasks Section */}
      <h2 className="text-xl font-bold text-black text-center mb-4">Tasks</h2>
      <TaskShow popups={popups} onPopupClick={handlePopupClick} />
    </div>
  );
};

export default TaskComponent;
