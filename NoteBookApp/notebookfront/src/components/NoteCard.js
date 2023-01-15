import { React, useState, useEffect } from "react";
import axios from "axios";
import EditNote from "./EditNote";
import "../styles/NoteCard.css";
export default function NoteCard({ note, curentUser }) {
    const [isClicked, setIsClicked] = useState(false);
    const deleteNote = () => {
        console.log(note);
        console.log(curentUser);
        axios.delete("/api/users/" + curentUser.id + "/notes/" + note.id);
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
                    <h5>{note.name}</h5>
                    <h5>{note.subject}</h5>
                    <h5>
                        {note.activityType}
                        {note.activityNumber}
                    </h5>
                    <h5>{note.activityDate}</h5>
                </div>
                <button className="delete-button" onClick={deleteNote}>
                    Delete this note
                </button>
            </div>
            {isClicked && <EditNote note={note} curentUser={curentUser} />}
        </div>
    );
}
