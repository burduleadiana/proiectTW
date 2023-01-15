import { React, useState } from "react";
import axios from "axios";
const StudyGroup = ({ curentUser }) => {
  const [group, setGroup] = useState({ name: "" });
  const createGroup = () => {
    axios
      .post("/api/" + curentUser.id + "/studygroups", group)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error.response);
      });
    setGroup({ name: "" });
  };
  return (
    <div>
      <label>Study group name:</label>
      <input
        type="text"
        name="share-input"
        placeholder="Group name"
        value={group.name}
        onChange={(e) => setGroup({ name: e.target.value })}
      />
      <button className="save-button" onClick={createGroup}>
        Create Group
      </button>
    </div>
  );
};

export default StudyGroup;
