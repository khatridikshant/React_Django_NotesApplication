import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  });

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted");
        else alert("Failed To Delete Note");
      })
      .catch((error) => alert(error));

    getNote();
  };

  const createNote = (e) => {
    e.preventDefault()
    api.post("/api/notes/", {content,title}).then((response) => {
      if (response.status === 201){
        alert("Note Created")
      } else {alert("Failed To Note Created")}
    }
  )
  }

  return <div>Home</div>;
};
