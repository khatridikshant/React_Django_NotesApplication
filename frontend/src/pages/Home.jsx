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
    e.preventDefault();
    api.post("/api/notes/", { content, title }).then((response) => {
      if (response.status === 201) {
        alert("Note Created");
      } else {
        alert("Failed To Note Created");
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Notes</h1>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
        </div>
        <div className="row">
          <h2>Create A Note</h2>
        </div>

        <div className="row">
          <form action="" onSubmit={createNote}>
            <div class="mb-3">
              <label for="title" class="form-label">
                Title
              </label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value) }
                value = {title}
                
              />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">
                Content
              </label>
              <textarea
                class="form-control"
                id="content"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3"><input type="submit" value="Submit" /></div>
          </form>
        </div>
      </div>
    </div>
  );
};
