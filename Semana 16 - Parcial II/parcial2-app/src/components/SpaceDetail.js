import React from 'react'

export default function SpaceDetail(props) {
    let path = "https://www.puptowncharlotte.com/wp-content/uploads/2020/09/icons_0001_clipart1681564.png";
    return (
        <div onClick = {() => props.setSpaceSelected(props.space)} className="card">
            <img alt="Imagen de casa" src={path} className="card-img-top" />
            <div className="card-body">
                <h6 className="card-title">{props.space.name}</h6>
                <p className="card-text">{props.space.address}</p>
            </div>
        </div>
    )
}
