import axios from "axios";
import React, { useEffect, useState } from "react";

const Group = ({ group, curentUser }) => {
  const [members, setMembers] = useState([]);
  const [synchError, setSynchError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const resp = await axios.get("/api/studygroups/" + group.id + "/users");

        setMembers(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    FetchData();
  }, [members]);

  const SynchronizeNotes = async () => {
    for (let j = 0; j < members.length; j++)
      for (let i = 0; i < members.length; i++) {
        if (members[i].email !== members[j].email) {
          const resp = await axios.get(
            "/api/notes/" + members[j].id + "/notes"
          );
          const notes = resp.data;
          notes.forEach((note) => {
            const note2 = {};
            note2.name = note.name;
            note2.subject = note.subject;
            note2.activityType = note.activityType;
            note2.activityNumber = note.activityNumber;
            note2.activityDate = note.activityDate;
            note2.text = note.text;
            axios
              .post("/api/users/" + members[i].id + "/notes", note2)
              .then((response) => {
                console.log(response.status);
              })
              .catch((error) => {
                setSynchError(true);
                console.log(error.response);
              });
          });
        }
      }
    if (synchError === false) setSuccess(true);
  };
  return (
    <div>
      <button className="general-button" onClick={SynchronizeNotes}>
        Synchronize your notes
      </button>
      {synchError && <h5>There was an error while synchronizing your notes!</h5>}
      {success && <h5>Your notes have synchronized successfully!</h5>}
      <h5>Members of your group:</h5>
      {members.length > 0 && members.map((item) => <h5>{item.firstName}</h5>)}
    </div>
  );
};

export default Group;
