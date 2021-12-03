import React from "react";

export default function DetailMovie(props) {
  return (
    <div className="card" style="width: 18rem;">
      <img src={props.movie.poster} className="card-img-top" alt="..." />
      <div className="card-body">
        <h6 className="card-title">{props.movie.name}</h6>
        <p className="card-text">{props.movie.description}</p>
        <p className="card-text" style="font-weight: bold;">
          {props.movie.cast}
        </p>
      </div>
    </div>
  );
}
