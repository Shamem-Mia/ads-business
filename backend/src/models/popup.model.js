import mongoose from "mongoose";

const popupSchema = new mongoose.Schema({
  link: { type: String, required: true }, // The link the popup redirects to
  bgColor: { type: String, default: "#ffffff" }, // Background color of the popup
  type: { type: String, enum: ["block", "direct"], default: "block" }, // Type of popup
  title: { type: String, default: "" }, // Optional: Add a title for the popup
  clickedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who clicked the popup
      lastClicked: { type: Date, default: Date.now }, // Timestamp of when the user clicked the popup
    },
  ], // Array to track users who clicked the popup
});

const Popup = mongoose.model("Popup", popupSchema);
export default Popup;
