import React, { useState } from "react";

export default function UpdateModal({ note, onClose, onUpdate }) {
  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.desc);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://127.0.0.1:5000/update/${note.sno}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc }),
    });

    onUpdate(note.sno, title, desc); // UI state update
    onClose(); // modal band
  };

  return (
    <div className="container my-3">
      <h2>Update Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Note Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id="desc"
          />
        </div>
        <button type="submit" className="btn btn-outline-dark mx-1">
          Update
        </button>
        <button className="btn btn-outline-dark mx-1" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}
