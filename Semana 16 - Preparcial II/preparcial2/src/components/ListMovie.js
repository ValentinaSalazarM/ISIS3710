import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Movie from "./Movie";

export default function ListMovie() {
  const intl = useIntl();
  let moviesArray = intl.messages["movies"];
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <FormattedMessage id="hName" defaultMessage="Name" />
            </th>
            <th scope="col">
              <FormattedMessage id="hDirectedBy" defaultMessage="Directed by" />
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
            <Movie key={i} movie={current} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
