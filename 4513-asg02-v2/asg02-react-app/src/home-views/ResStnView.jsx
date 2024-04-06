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
    /*props = props.seasonData, props.selectedRaceId, props.setRaceId, props.selectedSeason
    props.qualifyingData, props.fetchQualifyingData(fn, req's raceId), 
    props.resultsData, props.fetchResultsData(), resultsHandler(),
    props.circuitData, props.setCircuitData(raceid),
    displayResultsAndNotStandings=props.displayResultsAndNotStandings,
    driverStandingsData = props.driverStandingsData fetchDriverStandingsData= props.fetchDriverStandingsData(raceId)
    constructorStandingsData= props.constructorStandingsData, fetchConstructorStandingsData = props.fetchConstructorStandingsData(raceId)
    
    props.faves, props.addFaveDriver, props.addFaveConstructor, props.addFaveCircuit, props.emptyFaves*/




    //INFO FOR RESULTS HEADER
    let raceName = ""
    let round = ""
    let date = ""
    let circuitName = "Circuit Name TBD"

    //apply values if data is filled (note: currently only applies to results, not standings)
    if (props.resultsData.length > 0) {
        raceName = props.resultsData[0].race.name
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
    if (props.displayResultsAndNotStandings){
        // IF RESULTS WAS CLICKED (and also default)
        return(
            <div id="res-stn-container">
                <Breadcrumbs isDisabled variant='solid' color="primary">
                    <BreadcrumbItem>
                        {props.selectedSeason}
                    </BreadcrumbItem>
                    {raceName ? <BreadcrumbItem>{raceName}</BreadcrumbItem>:<></>}
                    {raceName ? <BreadcrumbItem>Results</BreadcrumbItem>:<></>}


                </Breadcrumbs>

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
                            driverData={props.resultsData.find((d) => d.driver.driverId == idForDriverModal)}
                            faveDrivers={props.faves.drivers} addFaveDriver={props.addFaveDriver}/>

                        <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                            constructorData={props.resultsData.find((c) => c.constructor.constructorId == idForConstructorModal)}
                            faveConstructors={props.faves.constructors} addFaveConstructor={props.addFaveConstructor}/>
                            
                        <CircuitModal idForCircuitModal={idForCircuitModal} showCircuit={showCircuit}
                            circuitData={props.circuitData[0]} faveCircuits={props.faves.circuits}
                            addFaveCircuit={props.addFaveCircuit}/>
                    </div>

                    <div id="qualify-results-container">
                        <div>
                            <h4>Qualifying</h4>
                                
                                    {props.qualifyingData.length > 0 ?
                                        <QualifyingViewer qualifyingData={props.qualifyingData}
                                            showDriver={showDriver} showConstructor={showConstructor} idForDriverModal={idForDriverModal} />
                                        : <p>No qualifying data found...</p>}
                                
                        </div>
                        <div>
                            <h4>Results</h4>
                            <ResultsViewer resultsData={props.resultsData} 
                            showDriver={showDriver} idForDriverModal={idForDriverModal} 
                            idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}/>
                        </div>
                    </div>
                </div>
            </div>             
        )
    }
    else{
        //STANDINGS WAS CLICKED
        return(
            <div id="res-stn-container">
                <Breadcrumbs isDisabled variant='solid' color="primary">
                    <BreadcrumbItem>
                        {props.selectedSeason}
                    </BreadcrumbItem>
                    {props.driverStandingsData.length > 0 ? 
                        <BreadcrumbItem>{props.driverStandingsData[0].race.name}</BreadcrumbItem>:<></>}
                    {raceName ? <BreadcrumbItem>Results</BreadcrumbItem>:<></>}
                    {props.driverStandingsData.length > 0 ? 
                        <BreadcrumbItem>Standings</BreadcrumbItem>:<></>}
                    {raceName ? <BreadcrumbItem>Results</BreadcrumbItem>:<></>}
                    
                </Breadcrumbs>

                <div id="standings-container">
                    <StandingsViewer driverStandingsData={props.driverStandingsData}
                        showDriver={showDriver} idForDriverModal={idForDriverModal}
                        constructorStandingsData={props.constructorStandingsData} showConstructor={showConstructor} idForConstructorModal={idForConstructorModal}
                    />
                    <div id="modals">
                        <DriverModal idForDriverModal={idForDriverModal} showDriver={showDriver}
                            driverData={props.driverStandingsData.find((d) => d.driver.driverId == idForDriverModal)} 
                            faveDrivers={props.faves.drivers} addFaveDriver={props.addFaveDriver} />
                        
                        <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                            constructorData={props.constructorStandingsData.find((c) => c.constructor.constructorId == idForConstructorModal)}
                            faveConstructors={props.faves.constructors} addFaveConstructor={props.addFaveConstructor}/>
                    </div>
                </div>
            </div> 
        )
    }

}

export default ResStnView