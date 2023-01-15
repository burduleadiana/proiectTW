import { React, useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import "../styles/ViewNotes.css";
import GroupCard from "./GroupCard";
export default function ViewNotes({ curentUser }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const resp = await axios.get("/api/notes/" + curentUser.id + "/notes");

        setNotes(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    FetchData();
  }, [notes]);

  return (
    <div className="notes-container">
      {notes.length === 0 && <h1>You don't have any available notes</h1>}
      {notes.length > 0 &&
        notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} curentUser={curentUser} />
          </div>
        ))}
    </div>
  );
}
