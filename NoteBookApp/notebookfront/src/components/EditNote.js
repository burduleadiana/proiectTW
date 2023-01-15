import { React, useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditNote.css";
export default function EditNote({ note, curentUser }) {
  const [editedNote, setEditedNote] = useState(note);
  const [isSaved, setIsSaved] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/api/users/" + curentUser.id + "/notes/" + note.id, editedNote)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error.response);
      });
    setIsSaved(true);
  };

  const ShareNote = async () => {
    let receiverId = "";
    const users = await axios.get("/api/users");
    const data = users.data;
    data.forEach((element) => {
      if (element.email === shareEmail) receiverId = element.id;
    });
    let sentNote = {
      name: note.name,
      subject: note.subject,
      activityType: note.activityType,
      activityNumber: note.activityNumber,
      activityDate: note.activityDate,
      text: note.text,
    };

    axios
      .post("/api/users/" + receiverId + "/notes", sentNote)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error.response);
      });
    setShareEmail("");
  };
  if (isSaved === false)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="inputs">
              <label>Title of your note</label>
              <input
                type="text"
                name="name"
                defaultValue={note.name}
                placeholder="Note title"
                onChange={(e) => (editedNote.name = e.target.value)}
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                defaultValue={note.subject}
                placeholder="Subject"
                onChange={(e) => (editedNote.subject = e.target.value)}
              />
              <label>Activity Type</label>
              <input
                type="text"
                name="activityType"
                defaultValue={note.activityType}
                placeholder="Course/Lab"
                onChange={(e) => (editedNote.activityType = e.target.value)}
              />
              <label>Activity Number</label>
              <input
                type="text"
                name="activityNumber"
                defaultValue={note.activityNumber}
                placeholder="Activity Number"
                onChange={(e) => (editedNote.activityNumber = e.target.value)}
              />
              <label>Activity Date</label>
              <input
                type="text"
                name="activityDate"
                defaultValue={note.activityDate}
                placeholder="Activity Date"
                onChange={(e) => (editedNote.activityDate = e.target.value)}
              />
            </div>
            <textarea
              rows="25"
              cols="100"
              defaultValue={note.text}
              placeholder="You can write your note here... "
              onChange={(e) => (editedNote.text = e.target.value)}
            ></textarea>
          </div>
          <input className="save-button" type="submit" value="Save Changes" />
        </form>
        <label>Share your note with your friends :</label>
        <input
          type="text"
          name="share-input"
          placeholder="email@stud.ase.ro"
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
        />
        <button className="save-button" onClick={ShareNote}>
          Share
        </button>
      </div>
    );
  else return <h1>Changes saved succesfully</h1>;
}
