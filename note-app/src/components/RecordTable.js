import React, { useState } from "react";
import UpdateModal from "./UpdateModal";

export default function RecordTable({ notes, onDelete, setNotes }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleUpdateInState = (sno, title, desc) => {
    setNotes(
      notes.map((note) => (note.sno === sno ? { ...note, title, desc } : note))
    );
  };

  return (
    <div className="container">
      {notes.length === 0 ? (
        <div className="alert alert-dark" role="alert">
          No Records Found!! Add First Note
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SNo</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.sno}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.desc}</td>
                <td>{note.date_created}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm mx-1"
                    onClick={() => setSelectedNote(note)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm mx-1"
                    onClick={() => onDelete(note.sno)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedNote && (
        <UpdateModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={handleUpdateInState}
        />
      )}
    </div>
  );
}
