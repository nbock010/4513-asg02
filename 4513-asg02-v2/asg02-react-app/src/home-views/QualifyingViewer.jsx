import { useState, useEffect } from 'react'

const QualifyingViewer = (props) => {
    /*props (from ResStnView): qualifyingData={props.qualifyingData} 
    showDriver={showDriver} idForDriverModal={idForDriverModal}*/

    // function passDriverId(data) {
    //     props.showDriver(data)
    // }

    if (props.qualifyingData.length == 0) {
        return (
            <div>
                <p id="no-qualifying-p">No qualifying data found for this race.</p>
            </div>
        )
    }
    else {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Pos.</th>
                        <th>Racer</th>
                        <th>Constructor</th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                    </tr>
                </thead>
                <tbody>
                    {props.qualifyingData.map((d, indx) =>
                        <tr key={indx}>
                            <th>{d.position}</th>
                            {/* I'll be honest here, I needed a little reminder with the help of chatGPT to properly pass the driverId... */}
                            <th>
                                <a className="clickable" onClick={() => props.showDriver(d.driver.driverId)} data={d.driver.driverId}>
                                    {d.driver.forename + " " + d.driver.surname}
                                </a>
                            </th>
                            <th>
                                <a className="clickable">
                                    {d.constructor.name}
                                </a>
                            </th>
                            <th>{(d.q1 ? d.q1 : "--")}</th>
                            <th>{(d.q2 ? d.q2 : "--")}</th>
                            <th>{(d.q3 ? d.q3 : "--")}</th>
                        </tr>)}
                </tbody>
            </table>
        )
    }
}

export default QualifyingViewer