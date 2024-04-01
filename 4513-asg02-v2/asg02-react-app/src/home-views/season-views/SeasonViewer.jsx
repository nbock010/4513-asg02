import { useState, useEffect } from 'react'
import SeasonTable from './SeasonTable'


const SeasonViewer = (props) => {
    /*props = props.selectedSeason, props.seasonData,
    props.fetchQualifyingData(fn, req's raceId),
    props.resultsHandler(), props.standingsHandler()
    */

    return (
        < div className="season-viewer" >
            <div>
                <h3 id="seasonH3">{"VALUE TBD"} Races</h3>
            </div>
            <div>
                <SeasonTable seasonData={props.seasonData} fetchQualifyingData={props.fetchQualifyingData}
                    resultsHandler={props.resultsHandler} standingsHandler={props.standingsHandler} />
            </div>
            {/* RESULTS and STANDINGS... how to if else here? */}
        </div >
    )
}

export default SeasonViewer

