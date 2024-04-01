import { useState, useEffect } from 'react'

const ResultsViewer = (props) => {
    //props: resultsData={props.resultsData} showDriver={showDriver} idForDriverModal={idForDriverModal}
    if (props.resultsData.length > 0) {
        //^ protects against a bug where, when null (i.e. on login/startup), props.resultsData[0].driver prevents the whole page from loading 

        if (props.resultsData.length == 0) {
            return (
                <p id="no-results-p">No results found for this race.</p>
            )
        }
        else {
            return (
                <div id="results-viewer">
                    <div id="results-top-three">
                        <div>
                            <h4>1st</h4>
                            <a className="clickable" onClick={
                                () => props.showDriver(props.resultsData[0].driver.driverId)
                            } data={props.resultsData[0].driver.driverId}>
                                {props.resultsData[0].driver.forename + " " + props.resultsData[0].driver.surname}
                            </a>
                        </div>
                        <div>
                            <h4>2nd</h4>
                            <a className="clickable" onClick={
                                () => props.showDriver(props.resultsData[1].driver.driverId)
                            } data={props.resultsData[1].driver.driverId}>
                                {props.resultsData[1].driver.forename + " " + props.resultsData[0].driver.surname}
                            </a>
                        </div>
                        <div>
                            <h4>3rd</h4>
                            <a className="clickable" onClick={
                                () => props.showDriver(props.resultsData[2].driver.driverId)
                            } data={props.resultsData[2].driver.driverId}>
                                {props.resultsData[2].driver.forename + " " + props.resultsData[2].driver.surname}
                            </a>
                        </div>
                    </div>
                    <div id="results-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pos.</th>
                                    <th>Racer</th>
                                    <th>Constructor</th>
                                    <th>Laps</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.resultsData.map((d, indx) =>
                                    <tr key={indx}>
                                        <th>{d.position}</th>
                                        <th>
                                            <a className="clickable">{d.driver.forename + " " + d.driver.surname}</a>
                                        </th>
                                        <th>
                                            <a className="clickable">{d.constructor.name}</a>
                                        </th>
                                        <th>{d.laps}</th>
                                        <th>{d.points}</th>
                                        {/* (d.q1 ? d.q1 : "N/A") */}

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>


                </div>
            )
        }

    }

}

export default ResultsViewer