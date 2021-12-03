import React from 'react'

export default function TableDevices(props) {
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Device</th>
                    <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                {props.devices.map((current, i) => (
                    <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{i}</td>
                    <td>{current.name}</td>
                    <td>{current.desired.value}</td>
                  </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
