import { React, useState } from "react";
import axios from "axios";
import "../styles/AddNote.css";
export default function AddNote({ curentUser }) {
    const [note, setNote] = useState({
        name: "",
        subject: "",
        activityType: "",
        activityNumber: "",
        activityDate: "",
        text: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(note);
        axios
            .post("/api/users/" + curentUser.id + "/notes", note)
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error.response);
            });
        e.target.reset();
    };
    return (
        <div id="addNote">
            <form className="add-note-form" onSubmit={handleSubmit}>
                <div className="form-content">
                    <div className="inputs">
                        <label>Title of your note</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Note title"
                            onChange={(e) => (note.name = e.target.value)}
                        />
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            onChange={(e) => (note.subject = e.target.value)}
                        />
                        <label>Activity Type</label>
                        <input
                            type="text"
                            name="activityType"
                            placeholder="Course/Lab"
                            onChange={(e) =>
                                (note.activityType = e.target.value)
                            }
                        />
                        <label>Activity Number</label>
                        <input
                            type="text"
                            name="activityNumber"
                            placeholder="Activity Number"
                            onChange={(e) =>
                                (note.activityNumber = e.target.value)
                            }
                        />
                        <label>Activity Date</label>
                        <input
                            type="text"
                            name="activityDate"
                            placeholder="Activity Date"
                            onChange={(e) =>
                                (note.activityDate = e.target.value)
                            }
                        />
                        <br />
                    </div>
                    <textarea id="text"
                        rows="25"
                        cols="100"
                        placeholder="You can write your note here... "
                        onChange={(e) => (note.text = e.target.value)}
                    ></textarea>
                    <br />
                </div>
                <input
                    className="save-button"
                    type="submit"
                    value="Save in notebook"
                    
                />
            </form>
        </div>
    );
}
