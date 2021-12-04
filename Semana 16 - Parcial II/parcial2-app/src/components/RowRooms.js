import React from "react";
import RoomDetail from "./RoomDetail";

export default function RowRooms(props) {
  return (
    <div className="row">
      {props.rooms.map((current, i) => (
        <RoomDetail
          key={i}
          room={current}
          setRoomSelected={props.setRoomSelected}
        />
      ))}
    </div>
  );
}
