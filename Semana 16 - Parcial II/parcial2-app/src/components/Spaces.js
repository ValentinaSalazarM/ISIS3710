import React, { useEffect, useState } from "react";
import RowSpaces from "./RowSpaces";

export default function Spaces(props) {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    if (navigator.onLine) {
      let urlSpaces =
        "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
      fetch(urlSpaces)
        .then((res) => res.json())
        .then((data) => {
          let columnSpaces = [];
          let newRow = [];
          for (let i = 0; i < data.length; i++) {
            newRow.push(data[i]);
            if (i % 4 === 3) {
              columnSpaces.push(newRow);
              newRow = [];
            }
          }
          setSpaces(columnSpaces);
          localStorage.setItem("space", JSON.stringify(columnSpaces));
        });
    } else {
      let spacesStorage = localStorage.getItem("space");
      if (spacesStorage !== null) {
        spacesStorage = JSON.parse(spacesStorage);
        setSpaces(spacesStorage);
      } else {
        setSpaces([]);
      }
    }
  }, [spaces]);
  return (
    <div>
      {spaces !== [] ? (
        <div className="container">
          <div className="container">
            {spaces.map((current, i) => (
              <RowSpaces
                key={i}
                spaces={current}
                setSpaceSelected={props.setSpaceSelected}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <p>
            {" "}
            <FormattedMessage id="messageOffline" />{" "}
          </p>{" "}
        </div>
      )}
    </div>
  );
}
