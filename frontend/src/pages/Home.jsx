import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

export const Home = () => {
  const [author, setAuthor] = useState("");
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

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
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted");
        else alert("Failed To Delete Note");
        getNote();
      })
      .catch((error) => alert(error));
  };

  const token = localStorage.getItem("ACCESS_TOKEN");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((response) => {
        if (response.status === 201) {
          alert("Note Created");
        } else {
          alert("Failed To Note Created");
        }
      })
      .catch((axioserror) => {
        console.log(axioserror);
        if (axioserror.response) {
          alert(axioserror.message + "It is response");
        }
        if (axioserror.request) {
          alert(axioserror.message + "It is request");
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
            {notes.map((note) => (
              <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">
                Content
              </label>
              <textarea
                class="form-control"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                id="content"
                name="content"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
