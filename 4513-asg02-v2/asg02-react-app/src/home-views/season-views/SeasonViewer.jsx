import { useState, useEffect } from 'react'
import SeasonTable from './SeasonTable'

import {Select, SelectItem} from "@nextui-org/react";
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh


const SeasonViewer = (props) => {
    /*props = props.selectedSeason, props.seasonData,
    props.fetchQualifyingData(fn, req's raceId),
    props.resultsHandler(), props.standingsHandler(), props.seasonHeaderHandler()
    */
    const years = [2023,2022,2021,2020,
        2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,
        2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]
    // if (props.selectedSeason && props.seasonData){
        return (
            <div className="season-viewer bg-blue-400" >
                <div className="season-selector">
                    <h3>Season</h3>
                    <Select label="Year" 
                        placeholder={props.selectedSeason ? props.selectedSeason : "Select a year"}
                         onChange={(e) => props.seasonHeaderHandler(e.target.value)}>
                        {years.map((y) =>
                            <SelectItem key={y} value={y}
                            textValue={y}>
                                {y}
                            </SelectItem>)}
                    </Select>
                </div>
                
                <h3 id="seasonH3">Races</h3> 
                <div className='table-wrapper'>
                        <SeasonTable seasonData={props.seasonData} fetchQualifyingData={props.fetchQualifyingData}
                            resultsHandler={props.resultsHandler} standingsHandler={props.standingsHandler} />
                </div> 
            </div>
        )
}

export default SeasonViewer

