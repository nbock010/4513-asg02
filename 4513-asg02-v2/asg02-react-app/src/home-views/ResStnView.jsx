import { useState, useEffect } from 'react'
import QualifyingViewer from './QualifyingViewer';
import ResultsViewer from './ResultsViewer';
import StandingsViewer from './standings-views/StandingsViewer';
import DriverModal from '../dialogs/DriverModal';
import ConstructorModal from '../dialogs/ConstructorModal';
import CircuitModal from '../dialogs/CircuitModal';

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";


//Resutls and Standings view
const ResStnView = (props) => {
    /*props = props.selectedRaceId, props.setRaceId, props.selectedSeason
    props.qualifyingData, props.fetchQualifyingData(fn, req's raceId), 
    props.resultsData, props.fetchResultsData(), resultsHandler(),
    props.circuitData, props.setCircuitData(raceid),
    displayResultsAndNotStandings=props.displayResultsAndNotStandings,
    driverStandingsData = props.driverStandingsData fetchDriverStandingsData= props.fetchDriverStandingsData(raceId)
    constructorStandingsData= props.constructorStandingsData, fetchConstructorStandingsData = props.fetchConstructorStandingsData(raceId)  */

    useEffect(() => {
        console.log("are we fetching something?")
        //THESE WERE BEING CALLED AT THE VERY START (though the if(raceId) condition still stopped the query. Is this still necessary here?)
        // props.fetchQualifyingData(props.selectedRaceId)
        // props.fetchResultsData(props.selectedRaceId)
        // props.fetchDriverStandingsData(props.selectedRaceId)
        // props.fetchConstructorStandingsData(props.selectedRaceId)
        //props.
    }, []);


    //INFO FOR RESULTS HEADER
    let raceName = ""
    let raceUrl = "#"
    let round = ""
    let date = ""
    let circuitName = "Circuit Name TBD"

    //apply values if data is filled (note: currently only applies to results, not standings)
    if (props.resultsData.length > 0) {
        raceName = props.resultsData[0].race.name
        raceUrl = props.resultsData[0].race.url
        round = props.resultsData[0].race.round
        date = new Date(props.resultsData[0].race.date).toDateString()
    }
    
    if (props.circuitData.length > 0){
        circuitName = props.circuitData[0].circuits.name;
    }

    //uses the truthyness state of a passed id to set isOpen to true or false
    const [idForDriverModal, openDriverModal] = useState(false)
    const [idForConstructorModal, openConstructorModal] = useState(false)
    const [idForCircuitModal, openCircuitModal] = useState(false) //uses raceId

    function showDriver(driverId) {
        openDriverModal(driverId)
        // console.log("attempting to show driver for " + idForDriverModal)
    }

    function showConstructor(constructorId){
        openConstructorModal(constructorId)
    }

    function showCircuit(raceId){
        openCircuitModal(raceId)
    }

    //SELECTIVE RETURN

    return(
        <div>
            <Breadcrumbs>
                <BreadcrumbItem>{props.selectedSeason}</BreadcrumbItem>
                <BreadcrumbItem>RACE NAME</BreadcrumbItem>
                {/* {raceName} works only if results are clicked */}
                {props.displayResultsAndNotStandings ? 
                    <BreadcrumbItem>Results</BreadcrumbItem> : <BreadcrumbItem>Standings</BreadcrumbItem>
                }
            </Breadcrumbs>
            
            {/* CONDITIONAL RETURN HERE */}
            {props.displayResultsAndNotStandings ? 
            // IF RESULTS WAS CLICKED (and also default)
            <div id="results-container">
                <div>
                    <h3>Results</h3>
                    {props.resultsData.length > 0 ? <p>
                        {raceName} Round {round} <br />{date} at
                        <a className="clickable" onClick={() => showCircuit(props.selectedRaceId)}> {circuitName}</a>
                    </p> : <p>[Select a year and a race]</p>}
                </div>
                <div id="modals">
                    <DriverModal idForDriverModal={idForDriverModal} showDriver={showDriver}
                        driverData={props.resultsData.find((d) => d.driver.driverId == idForDriverModal)} />
                    <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                        constructorData={props.resultsData.find((c) => c.constructor.constructorId == idForConstructorModal)}/>
                    <CircuitModal idForCircuitModal={idForCircuitModal} showCircuit={showCircuit}
                        circuitData={props.circuitData[0]}/>
                </div>

                <div id="qualify-results-container">
                    <div>
                        <h4>Qualifying</h4>
                        {props.qualifyingData.length > 0 ?
                            <QualifyingViewer qualifyingData={props.qualifyingData}
                                showDriver={showDriver} showConstructor={showConstructor} idForDriverModal={idForDriverModal} />
                            : 
                            <p>No qualifying data found...</p>}
                    </div>
                    <div>
                        <h4>Results</h4>
                        <ResultsViewer resultsData={props.resultsData} 
                        showDriver={showDriver} idForDriverModal={idForDriverModal} 
                        idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}/>
                    </div>
                </div>
            </div>
            : 
            //^^IF STANDINGS WAS CLICKED
            <div>
            <StandingsViewer driverStandingsData={props.driverStandingsData}
                showDriver={showDriver} idForDriverModal={idForDriverModal}
                constructorStandingsData={props.constructorStandingsData} showConstructor={showConstructor} idForConstructorModal={idForConstructorModal}
            />

            <div id="modals">
                <DriverModal idForDriverModal={idForDriverModal} showDriver={showDriver}
                    driverData={props.driverStandingsData.find((d) => d.driver.driverId == idForDriverModal)} />
                <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                    constructorData={props.constructorStandingsData.find((c) => c.constructor.constructorId == idForConstructorModal)}></ConstructorModal>
            </div>
        </div>}
        </div>
        
                        )
    // if (props.displayResultsAndNotStandings) { //i.e., if results was clicked, not standings
    //     // console.log("DISPLAYING RESULTS")
    //     return (
            
    //     )
    // }
    // else { //i.e., if standings was clicked, not results
    //     // console.log("DISPLAYING STANDINGS")
    //     return (
            
    //     )
    // }
}

export default ResStnView