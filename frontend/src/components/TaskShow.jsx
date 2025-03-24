import React from "react";

const TaskShow = ({ popups, onPopupClick }) => {
  // Filter popups to show only tasks (type: "block")
  const taskPopups = popups.filter((popup) => popup.type === "block");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {taskPopups.map(
        (popup) =>
          popup.visible && (
            <div
              key={popup._id}
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center"
              style={{ backgroundColor: popup.bgColor }}
              onClick={(e) => onPopupClick(popup._id, e)}
            >
              <a
                href={popup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline text-center"
              >
                Task {popup.title}
              </a>
            </div>
          )
      )}
    </div>
  );
};

export default TaskShow;
