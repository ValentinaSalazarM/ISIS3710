import React from 'react'
import SpaceDetail from './SpaceDetail'

export default function RowSpaces(props) {
    return (
        <div className ="row">
            {props.spaces.map((current, i) => (
              <SpaceDetail key = {i} space = {current} setSpaceSelected={props.setSpaceSelected}/>
            ))}
        </div>
    )
}
