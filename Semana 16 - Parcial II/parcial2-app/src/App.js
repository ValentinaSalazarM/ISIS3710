import React, { useState } from "react";
import "./App.css";
import Rooms from "./components/Rooms";
import Spaces from "./components/Spaces";
import { FormattedMessage } from "react-intl";
function App() {
  let [spaceIDSelected, setSpaceSelected] = useState(-1);
  return (
    <div className="App">
      <h2 className="titles">
        {" "}
        <FormattedMessage id="titleSpaces" />{" "}
      </h2>
      <Spaces setSpaceSelected={setSpaceSelected}></Spaces>
      <div>
        {spaceIDSelected !== -1 ? (
          <div className="container">
            <h3 className="titles">
              <FormattedMessage id="titleRooms" />{" "}
            </h3>
            <Rooms idSpace={spaceIDSelected}></Rooms>{" "}
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}

export default App;
