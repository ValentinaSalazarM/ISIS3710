import React, {useEffect, useState} from 'react'
import RowSpaces from './RowSpaces';

export default function Spaces(props) {
    const [spaces, setSpaces] = useState([]);
    
    
    useEffect (() => {
        let urlSpaces = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        fetch (urlSpaces).then((res) => res.json()).then(data => {
            let columnSpaces = [];
            let newRow = [];
            for (let i = 0; i < data.length; i++)
            {
                if (i % 4 === 3){
                    newRow.push(data[i]);
                    columnSpaces.push(newRow);
                    newRow = [];
                }
                else {
                    newRow.push(data[i]);
                }
            }
            setSpaces(columnSpaces);
        })
    }, []);
    return (
        <div className = "container">
            <h2> My spaces </h2>
            <div className = "container">
            {spaces.map((current, i) => (
              <RowSpaces key = {i} spaces = {current} setSpaceSelected={props.setSpaceSelected}/>
            ))}
            </div>
        </div>
    )
}
