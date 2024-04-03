import { useState, useEffect } from 'react'
import SeasonTable from './SeasonTable'
import loadingGif from '../../assets/wheel.gif'
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh


const SeasonViewer = (props) => {
    /*props = props.selectedSeason, props.seasonData,
    props.fetchQualifyingData(fn, req's raceId),
    props.resultsHandler(), props.standingsHandler()
    */

    if (props.selectedSeason){
        return (
            < div className="season-viewer" >
                <div>
                    <h3 id="seasonH3">Races</h3>
                </div>
                <div>
                    <SeasonTable seasonData={props.seasonData} fetchQualifyingData={props.fetchQualifyingData}
                        resultsHandler={props.resultsHandler} standingsHandler={props.standingsHandler} />
                </div>
            </div >
        )
    }
    else{
        return(
            <img src={loadingGif} alt="loading.gif" width="200"></img>
        )
    }
}

export default SeasonViewer

