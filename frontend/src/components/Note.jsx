import React from "react";

const Note = ({ note, onDelete }) => {
  const date = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div>
      <div className="row">Note</div>
      <div className="row">
        <div class="card" style={{width: '18rem' }}>
          <img
            src="https://placehold.co/600x400"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{note.title}</h5>
            <br />
            <h6>{date}</h6>
            <p class="card-text">{note.content}</p>
            <button
              href="#"
              onClick={() => onDelete(note.id)}
              class="btn btn-primary"
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
