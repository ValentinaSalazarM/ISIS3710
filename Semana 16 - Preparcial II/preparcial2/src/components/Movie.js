import React, { useState } from "react";
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
} from "react-intl";
import DetailMovie from "./DetailMovie";

export default function Movie(props) {
  let movieSelected,
    setMovie = useState(null);
  const handleOnSelect = (row, isSelect) => {};
  return (
    <>
      <div className="col-7">
        <tr>
          <th scope="row">{props.movie.id}</th>
          <td>{props.movie.name}</td>
          <td>{props.movie.directedBy}</td>
          <td>{props.movie.country}</td>
          <td>
            {props.movie.budget} &nbsp;
            <FormattedPlural
              value={props.movie.budget}
              one={<FormattedMessage id="Million" />}
              other={<FormattedMessage id="Millions" />}
            ></FormattedPlural>
          </td>
          <td>
            <FormattedDate
              value={new Date(props.movie.releaseDate)}
              year="numeric"
              month="long"
              day="numeric"
            />
          </td>
          <td>
            <FormattedNumber value={props.movie.views} />
          </td>
        </tr>
      </div>
      <div className="col-5">
        movieSelected? <DetailMovie movie={movieSelected}></DetailMovie>:{" "}
        <div></div>
      </div>
    </>
  );
}
