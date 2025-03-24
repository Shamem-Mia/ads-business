import React, { useEffect, useState } from "react";
import GenerateTask from "../components/GenerateTask";
import TaskComponent from "../components/TaskComponent";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";

const TaskPage = () => {
  const [adminPopups, setAdminPopups] = useState([]);
  const { authUser } = useAuthStore();

  // useEffect hook to fetch popups from the server when the component mounts
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await axiosInstance.get("/admin/popups", {
          params: { userId: authUser._id }, // Pass the user ID to the backend
        });

        // Check if the response data is valid and is an array
        if (response.data && Array.isArray(response.data)) {
          // Filter popups based on whether the user has clicked them and the time elapsed
          const filteredPopups = response.data.map((popup) => {
            // Check if the user has clicked the popup
            const userClick = popup.clickedBy.find(
              (click) => click.userId.toString() === authUser._id
            );

            if (userClick) {
              // Calculate the time elapsed since the user clicked the popup
              const timeElapsed =
                Date.now() - new Date(userClick.lastClicked).getTime();

              // If less than 2 hours have passed, hide the popup for this user
              if (timeElapsed < 2 * 60 * 60 * 1000) {
                return { ...popup, visible: false };
              } else {
                // Otherwise, make the popup visible again
                return { ...popup, visible: true };
              }
            }

            // If the user hasn't clicked the popup, keep it visible
            return { ...popup, visible: true };
          });

          // Update the state with the filtered popups
          setAdminPopups(filteredPopups);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch popups", err);
        toast.error("Failed to fetch popups. Please try again.");
      }
    };
    // Fetch popups immediately when the component mounts
    fetchPopups();
    // Set up an interval to fetch popups every 10 seconds
    const interval = setInterval(fetchPopups, 10000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle adding a new popup
  const handleAddPopup = async (newPopup) => {
    try {
      const response = await axiosInstance.post("/admin/popups", newPopup);
      setAdminPopups((prev) => [...prev, response.data]);
      toast.success("Popup added successfully!");
    } catch (error) {
      console.error("Failed to add popup", error);
      toast.error("Failed to add popup. Please try again.");
    }
  };

  return (
    <div>
      {authUser.role === "admin" ? (
        <GenerateTask onAddPopup={handleAddPopup} />
      ) : (
        ""
      )}

      <TaskComponent adminPopups={adminPopups} />
    </div>
  );
};

export default TaskPage;
