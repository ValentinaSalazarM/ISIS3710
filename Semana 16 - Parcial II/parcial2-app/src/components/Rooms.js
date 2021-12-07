import React, { useEffect, useState } from "react";
import RowRooms from "./RowRooms";
import TableDevices from "./TableDevices";
import { FormattedMessage } from "react-intl";
import Graph from "./Graph";

export default function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState(null);

  useEffect(() => {
    if (navigator.onLine) {
      let urlrooms =
        "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
      fetch(urlrooms)
        .then((res) => res.json())
        .then((data) => {
          filterData(data);
          localStorage.setItem("dataRooms", JSON.stringify(data));
        });
    } else {
      let data = localStorage.getItem("dataRooms");
      if (data) {
        data = JSON.parse(data);
        filterData(data);
      } else {
        setRooms([]);
        setAllRooms([]);
      }
    }

    function filterData(data) {
      let columnRooms = [];
      let newRow = [];
      let allRoomsTemp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].homeId === props.idSpace) {
          allRoomsTemp.push(data[i]);
          newRow.push(data[i]);
          if (newRow.length === 3) {
            columnRooms.push(newRow);
            newRow = [];
          }
        }
      }
      if (newRow !== []) {
        columnRooms.push(newRow);
      }
      setAllRooms(allRoomsTemp);
      setRooms(columnRooms);
    }
  }, [props.idSpace]);

  return (
    <div>
      {rooms !== [] ? (
        <div>
          <div className="row">
            <div className="col-8">
              {rooms.map((current, i) => (
                <RowRooms
                  key={i}
                  rooms={current}
                  setRoomSelected={setRoomSelected}
                />
              ))}
            </div>
            {roomSelected ? (
              <div className="col-4">
                <TableDevices devices={roomSelected.devices}></TableDevices>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
          <div>
            <div className="container">
              <h3 className="titles">
                <FormattedMessage id="titleStats" />
              </h3>
              <h6>
                <FormattedMessage id="titleGraph" />
              </h6>
              <Graph rooms={allRooms}></Graph>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <p>
            {" "}
            <FormattedMessage id="messageOffline" />{" "}
          </p>
        </div>
      )}
    </div>
  );
}
