import { useState, useEffect } from 'react'
import QualifyingViewer from './QualifyingViewer';
import ResultsViewer from './ResultsViewer';
import StandingsViewer from './standings-views/StandingsViewer';
import DriverModal from '../dialogs/DriverModal';
import ConstructorModal from '../dialogs/ConstructorModal';


//Resutls and Standings view
const ResStnView = (props) => {
    /*props = props.selectedRaceId, props.setRaceId,
    props.qualifyingData, props.fetchQualifyingData(fn, req's raceId), 
    props.resultsData, props.fetchResultsData(), resultsHandler(),

    displayResultsAndNotStandings=props.displayResultsAndNotStandings,
    driverStandingsData = props.driverStandingsData fetchDriverStandingsData= props.fetchDriverStandingsData(raceId)
    constructorStandingsData= props.constructorStandingsData, fetchConstructorStandingsData = props.fetchConstructorStandingsData(raceId)  */

    useEffect(() => {
        props.fetchQualifyingData(props.selectedRaceId)
        props.fetchResultsData(props.selectedRaceId)
        props.fetchDriverStandingsData(props.selectedRaceId)
        props.fetchConstructorStandingsData(props.selectedRaceId)
        //fetch standings data
    }, []);


    //INFO FOR RESULTS HEADER
    let raceName = ""
    let raceUrl = "#"
    let round = ""
    let date = ""
    let circuitName = "Circuit Name TBD"
    let circuitUrl = "#"
    //apply values if data is filled
    if (props.resultsData.length > 0) {
        raceName = props.resultsData[0].race.name
        raceUrl = props.resultsData[0].race.url
        round = props.resultsData[0].race.round
        date = new Date(props.resultsData[0].race.date).toDateString()
        circuitName = "Circuit Name TBD"
        let circuitUrl = "#" //tbd
    }

    //uses the truthyness state of a passed id to set isOpen to true or false
    const [idForDriverModal, openDriverModal] = useState(false)
    const [idForConstructorModal, openConstructorModal] = useState(false)
    //const [idForCircuitModal, openCircuitModal] = useState(false)

    function showDriver(driverId) {
        openDriverModal(driverId)
        // console.log("attempting to show driver for " + idForDriverModal)
    }

    function showConstructor(constructorId){
        openConstructorModal(constructorId)
    }

    //SELECTIVE RETURN
    if (props.displayResultsAndNotStandings) { //i.e., if results was clicked, not standings
        return (
            <div id="results-container">
                <div>
                    <h3>Results</h3>
                    {props.resultsData.length > 0 ? <p>
                        {raceName} Round {round} <br />{date} at
                        <a className="clickable"> {circuitName}</a>
                    </p> : <p>[Select a year and a race]</p>}
                </div>

                <div id="modals">
                    <DriverModal idForDriverModal={idForDriverModal} showDriver={showDriver}
                        driverData={props.qualifyingData.find((d) => d.driver.driverId == idForDriverModal)} />
                    <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                        constructorData={props.resultsData.find((c) => c.constructor.constructorId == idForConstructorModal)}></ConstructorModal>
                </div>

                <div id="qualify-results-container">
                    <div>
                        <h4>Qualifying</h4>
                        {props.qualifyingData.length > 0 ?
                            <QualifyingViewer qualifyingData={props.qualifyingData}
                                showDriver={showDriver} idForDriverModal={idForDriverModal} />
                            : <p>[Select a year and a race]</p>}
                    </div>
                    <div>
                        <h4>Results</h4>
                        <ResultsViewer resultsData={props.resultsData} 
                        showDriver={showDriver} idForDriverModal={idForDriverModal} 
                        idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}/>
                    </div>
                </div>
            </div>
        )
    }
    else { //i.e., if standings was clicked, not results
        return (
            <div>
                <StandingsViewer driverStandingsData={props.driverStandingsData}
                    showDriver={showDriver} idForDriverModal={idForDriverModal}
                    constructorStandingsData={props.constructorStandingsData} showConstructor={showConstructor} idForConstructorModal={idForConstructorModal}
                />

                <div id="modals">
                    <DriverModal idForDriverModal={idForDriverModal} showDriver={showDriver}
                        driverData={props.qualifyingData.find((d) => d.driver.driverId == idForDriverModal)} />
                    <ConstructorModal idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
                        constructorData={props.resultsData.find((c) => c.constructor.constructorId == idForConstructorModal)}></ConstructorModal>
                </div>
            </div>
        )
    }
}

export default ResStnView