import Popup from "../models/popup.model.js";

// Fetch all popups and filter based on user interaction
export const getPopups = async (req, res) => {
  try {
    const { userId } = req.query; // Get the user ID from the query params

    // Fetch all popups
    const popups = await Popup.find();

    // Filter popups to exclude those clicked by the current user within the last 2 hours
    const filteredPopups = popups.map((popup) => {
      // Check if the user has clicked the popup
      const userClick = popup.clickedBy.find(
        (click) => click.userId.toString() === userId
      );

      if (userClick) {
        // Calculate the time elapsed since the user clicked the popup
        const timeElapsed =
          Date.now() - new Date(userClick.lastClicked).getTime();

        // If less than 2 hours have passed, hide the popup for this user
        if (timeElapsed < 2 * 60 * 60 * 1000) {
          return { ...popup.toObject(), visible: false };
        } else {
          // Otherwise, make the popup visible again
          return { ...popup.toObject(), visible: true };
        }
      }

      // If the user hasn't clicked the popup, keep it visible
      return { ...popup.toObject(), visible: true };
    });

    res.json(filteredPopups);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popups", error: error });
  }
};

export const generatePopups = async (req, res) => {
  try {
    const { link, bgColor, type, title } = req.body;

    const newPopup = new Popup({
      link,
      bgColor,
      type,
      title,
    });

    await newPopup.save();
    res.status(201).json(newPopup);
  } catch (err) {
    console.error("Error adding popup:", err);
    res.status(500).json({ message: "Failed to add popup", error: err });
  }
};

// Update popup visibility when a user clicks it
export const popupVisibility = async (req, res) => {
  try {
    const { id } = req.params; // Popup ID
    const { userId } = req.body; // User ID

    // Find the popup and add the user to the clickedBy array
    const updatedPopup = await Popup.findByIdAndUpdate(
      id,
      {
        $push: {
          clickedBy: { userId, lastClicked: new Date() }, // Add user ID and timestamp
        },
      },
      { new: true }
    );

    if (!updatedPopup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    res.json(updatedPopup);
  } catch (error) {
    console.error("Error updating popup:", error);
    res.status(500).json({ message: "Failed to update popup", error: error });
  }
};
