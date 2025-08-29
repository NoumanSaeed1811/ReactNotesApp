import React, { useState } from "react";

export default function TextForm({ onNoteAdded }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
   const handleSubmit = async (e) => {
    e.preventDefault(); // form refresh na kare

    // Flask API ko POST request bheji
    const response = await fetch("http://127.0.0.1:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc }),
    });

    if (response.ok) {
    //   const result = await response.json();
    //   console.log(result);

      // parent ko batana ki ek new note add ho gaya
      onNoteAdded();

      // form reset kar do
      setTitle("");
      setDesc("");
    }
  };
  return (
    <div className="container my-3">
      <h2>Add Notes</h2>
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="font-weight-bold">Note Title</label>
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
          <label htmlFor="desc" className="font-weight-bold">Description</label>
          <input type="text"
           className="form-control" 
           name="desc" value={desc}
          onChange={(e) => setDesc(e.target.value)}
           id="desc" />
        </div>
        <button type="submit" className="btn btn-outline-dark">
          Add
        </button>
      </form>
    </div>
  );
}
