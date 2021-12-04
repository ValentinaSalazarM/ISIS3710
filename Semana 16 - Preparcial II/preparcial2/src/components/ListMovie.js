import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DetailMovie from "./DetailMovie";
import Movie from "./Movie";

export default function ListMovie() {
  const intl = useIntl();
  let moviesArray = intl.messages["movies"];
  let firstMovie = moviesArray[0];
  let [movieSelected, setMovie] = useState(firstMovie);

  return (
    <div className="row">
      <div className="col-7">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <FormattedMessage id="hName" defaultMessage="Name" />
              </th>
              <th scope="col">
                <FormattedMessage
                  id="hDirectedBy"
                  defaultMessage="Directed by"
                />
              </th>
              <th scope="col">
                <FormattedMessage id="hCountry" defaultMessage="Country" />
              </th>
              <th scope="col">
                <FormattedMessage id="hBudget" defaultMessage="Budget" />
              </th>
              <th scope="col">
                <FormattedMessage id="hReleaseDate" defaultMessage="Release" />
              </th>
              <th scope="col">
                <FormattedMessage id="hViews" defaultMessage="Views" />
              </th>
            </tr>
          </thead>
          <tbody>
            {moviesArray.map((current, i) => (
              <Movie key={i} movie={current} setMovie={setMovie} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-5">
        <DetailMovie movie={movieSelected}></DetailMovie>
      </div>
    </div>
  );
}
