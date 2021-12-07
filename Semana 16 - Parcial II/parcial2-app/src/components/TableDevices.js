import React from "react";
import { FormattedMessage } from "react-intl";

export default function TableDevices(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">
              <FormattedMessage id="device" />
            </th>
            <th scope="col">
              <FormattedMessage id="value" />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.devices.map((current, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{i}</td>
              <td>{current.name}</td>
              <td>{current.desired.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
