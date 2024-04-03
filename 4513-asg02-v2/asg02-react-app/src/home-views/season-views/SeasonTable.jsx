import { useState, useEffect } from 'react'

const SeasonTable = (props) => {
    /*props = props.seasonData, props.fetchQualifyingData(fn, req's raceId),
    props.resultsHandler(), props.standingsHandler()
    */


    return (
        <table>
            <thead>
                <tr>
                    <th>Rnd.</th>
                    <th>Circuit</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="season-race-table">
                {props.seasonData.map((d, indx) =>
                    <tr key={indx} value={d.raceId}>
                        <th>{d.round}</th>
                        <th>{d.name}</th>
                        <th>
                            <button onClick={props.resultsHandler} value={d.raceId}>Results</button>
                        </th>
                        <th>
                            <button onClick={props.standingsHandler} value={d.raceId}>Standings</button>
                        </th>
                    </tr>)}
            </tbody>


        </table>
    )
}

export default SeasonTable