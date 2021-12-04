import React from "react";

export default function RoomDetail(props) {
  let path = "";
  if (props.room.type === "kitcken") {
    path = "../../assets/Kitchen.png";
  } else {
    path = "../../assets/LivingRoom.png";
  }
  return (
    <div className="col-4 mb-4 d-flex align-items-stretch">
      <div onClick={() => props.setRoomSelected(props.room)} className="card">
        <h6 className="card-title">{props.room.name}</h6>
        <img src={path} className="card-img-top" alt="Imagen de una sala" />
      </div>
    </div>
  );
}
