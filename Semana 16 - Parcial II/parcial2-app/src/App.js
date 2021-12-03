import React, {useState} from 'react';
import './App.css';
import Rooms from './components/Rooms';
import Spaces from './components/Spaces';

function App() {
  let [spaceSelected, setSpaceSelected] = useState({id: -1});
  return (
    <div className="App">
      <Spaces setSpace = {setSpaceSelected}></Spaces>
      {spaceSelected? <Rooms idSpace = {spaceSelected.id}></Rooms>: <div> </div>}
    </div>
  );
}

export default App;
