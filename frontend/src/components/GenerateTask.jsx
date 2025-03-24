import React, { useState } from "react";

const GenerateTask = ({ onAddPopup }) => {
  const [adLink, setAdLink] = useState("");
  const [popupType, setPopupType] = useState("block");
  const [popupTitle, setPopupTitle] = useState("");

  const handleAddPopup = (e) => {
    e.preventDefault();
    if (!adLink) {
      alert("Please enter a valid ad link.");
      return;
    }

    // Generate a new popup
    const newPopup = {
      link: adLink,
      bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random background color
      type: popupType,
      title: popupTitle, // Default title
    };

    // Pass the new popup to the parent component
    onAddPopup(newPopup);

    // Clear the input
    setAdLink("");
    setPopupTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Admin Page - Create Task
      </h1>

      {/* Form for adding dynamic popups */}
      <form onSubmit={handleAddPopup} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="adLink"
            className="block text-sm font-medium text-gray-700"
          >
            Add Popup Link
          </label>
          <input
            type="url"
            id="adLink"
            value={adLink}
            onChange={(e) => setAdLink(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter ad link"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="popupType"
            className="block text-sm font-medium text-gray-700"
          >
            Popup Type
          </label>
          <select
            id="popupType"
            value={popupType}
            onChange={(e) => setPopupType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="block">Task</option>
            <option value="direct">Direct Ad</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="popupTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Popup Title
          </label>
          <input
            type="text"
            id="popupTitle"
            value={popupTitle}
            onChange={(e) => setPopupTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter popup title"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default GenerateTask;
