import React from "react";

export default function SpaceDetail(props) {
  let path = "";
  if (props.space.type === "loft") {
    path = "../../assets/Apartment.png";
  } else {
    path = "../../assets/House.png";
  }
  return (
    <div className="col-3 mb-3 d-flex align-items-stretch">
      <div
        onClick={() => props.setSpaceSelected(props.space.id)}
        className="card"
      >
        <img alt="Imagen de casa" src={path} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{props.space.name}</h6>
          <p className="card-text">{props.space.address}</p>
        </div>
      </div>
    </div>
  );
}
