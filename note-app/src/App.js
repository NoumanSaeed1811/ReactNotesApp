import "./App.css";
import Navbar from "./components/Navbar";
import RecordTable from "./components/RecordTable";
import TextForm from "./components/TextForm";
import React, { useState, useEffect } from "react";
function App() {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/notes");
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (sno) => {
    fetch(`http://127.0.0.1:5000/api/notes/${sno}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // UI se bhi hatao
        setNotes(notes.filter((note) => note.sno !== sno));
      });
  };

  return (
    <>
      <Navbar />
      <TextForm onNoteAdded={fetchNotes} />
      <RecordTable notes={notes} onDelete={handleDelete} setNotes={setNotes}/>
    </>
  );
}

export default App;
