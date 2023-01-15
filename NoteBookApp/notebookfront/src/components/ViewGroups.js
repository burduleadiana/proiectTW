import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupCard from "./GroupCard";
const ViewGroups = ({ curentUser }) => {
  const [groups, setGroups] = useState("");
  useEffect(() => {
    const FetchData = async () => {
      try {
        const resp = await axios.get("/api/" + curentUser.id + "/studygroups");

        setGroups(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    FetchData();
  }, [groups]);
  return (
    <div>
      {groups.length === 0 && (
        <h1>You didn't join any groups!</h1>
      )}
      {groups.length > 0 &&
        groups.map((group) => (
          <div key={group.id}>
            <GroupCard group={group} curentUser={curentUser} />
          </div>
        ))}
    </div>
  );
};

export default ViewGroups;
