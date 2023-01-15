import React, { useState, useEffect } from "react";
import axios from "axios";
import Group from "./Group";
const GroupCard = ({ group, curentUser }) => {
  const [isClicked, setIsClicked] = useState(false);

  const LeaveGroup = () => {
    axios.delete("/api/studyGroups/" + group.id + "/users/" + curentUser.id);
  };

  return (
    <div id="card">
      <div className="note-card">
        {" "}
        <div
          className="note-info"
          onClick={() => {
            if (isClicked === true) setIsClicked(false);
            else setIsClicked(true);
          }}
        >
          <h5>{group.name}</h5>
        </div>
        <button className="delete-button" onClick={LeaveGroup}>
          Leave this group by clicking here
        </button>
      </div>
      {isClicked && <Group group={group} curentUser={curentUser} />}
    </div>
  );
};

export default GroupCard;
