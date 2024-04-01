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
            <tbody>
                {props.seasonData.map((d, indx) =>
                    <tr key={indx}>
                        <th>{d.round}</th>
                        <th>{d.name}</th>
                        <th>
                            <button onClick={props.resultsHandler} value={d.raceId}>Results {d.raceId}</button>
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