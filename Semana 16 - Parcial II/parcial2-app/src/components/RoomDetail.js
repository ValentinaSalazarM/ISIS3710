import React from 'react'

export default function RoomDetail(props) {
    let path = "https://365psd.com/images/istock/previews/9736/97362673-color-furniture-living-room-flat-icon.jpg";

    return (
        <div onClick = {() => props.setRoomSelected(props.room)} className="card">
            <h6 className="card-title">{props.room.name}</h6>
            <img src={path} className="card-img-top" alt="Imagen de una sala" />
        </div>
    )
}
