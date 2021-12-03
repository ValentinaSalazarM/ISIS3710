import React, {useEffect, useState} from 'react'
import RowRooms from './RowRooms';
import TableDevices from './TableDevices';

export default function Rooms(props) {
    const [rooms, setRooms] = useState([]);
    const [roomSelected, setRoomSelected] = useState({devices: []});

    useEffect (() => {
        let urlrooms = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        fetch (urlrooms).then((res) => res.json()).then(data => {
            let columnrooms = [];
            let newRow = [];
            for (let i = 0; i < data.length; i++)
            {
                if (parseInt(data[i].homeId) === props.idSpace)
                {
                    if (i % 4 === 3){
                        newRow.push(data[i]);
                        columnrooms.push(newRow);
                        newRow = [];
                    }
                    else {
                        newRow.push(data[i]);
                    }
                }
            }
            setRooms(columnrooms);
        })
    }, []);
    return (
        <div className = "row">
            <div className = "col-8">
            {rooms.map((current, i) => (
              <RowRooms key = {i} rooms = {current} setRoomSelected={setRoomSelected}/>
            ))}
            </div>
            {
                roomSelected?
                <div className = "col-4">
                    <TableDevices devices = {roomSelected.devices}></TableDevices>
                </div>:
                <div> </div>
            }
        </div>
    )
}
