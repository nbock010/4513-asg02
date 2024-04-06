import { useState, useEffect } from 'react'
import SeasonViewer from './season-views/SeasonViewer.jsx';
import ResStnView from './ResStnView.jsx'
import loadingGif from '../assets/wheel.gif'
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh
import {Button} from "@nextui-org/react";
import LoadingModal from '../dialogs/LoadingModal.jsx';
import AboutModal from '../dialogs/AboutModal.jsx';
import FavesModal from '../dialogs/FavesModal.jsx';

const HomeView = (props) => {
    /*props = props.seasonData, props.fetchSeasonData (function), 
    props.selectedSeason, props.setSeason (function),
    props.selectedRaceId, props.setRaceId,

    props.circuitData, props.fetchCircuitData(raceId),
    props.qualifyingData, props.fetchQualifying(),
    props.resultsData, props.fetchResultsData(raceId),

    driverStandingsData = =props.driverStandingsData, fetchDriverStandingsData= props.fetchDriverStandingsData(raceId)
    constructorStandingsData = props.constructorStandingsData fetchConstructorStandingsData = props.fetchConstructorStandingsData(raceId)
    
    isLoading={isLoading} changeLoadingStatus={changeLoadingStatus}
    props.clearResultsData()
*/
    useEffect(() => {
        console.log("homeview -> useEffect, selectedSeason: " + props.selectedSeason)
        props.fetchSeasonData(props.selectedSeason)
    }, []);

    

    if (props.selectedRaceId){
        console.log("qualifying data for " + props.selectedRaceId)
        console.log(props.qualifyingData)
        console.log("results data for " + props.selectedRaceId)
        console.log(props.resultsData)
        console.log('driver standings data for ' + props.selectedRaceId)
        console.log(props.driverStandingsData)
        console.log('constructor standings data for : ' + props.selectedRaceId)
        console.log(props.constructorStandingsData)
    }

    //HANDLER FOR SEASON DROPDOWN
    //NextUi update: key= the year selected
    const seasonHeaderHandler = (key) => {
        console.log(key)
        //props.changeLoadingStatus(true)
        props.setSeason(key);
        props.fetchSeasonData(key); 
        //CHANGE HEADER (if one is loaded yet; this 'if' prevents a null error)
        if (document.querySelector("#seasonH3")){
            document.querySelector("#seasonH3").textContent = (key + " Races");
        }
        clearSeasonHighlights() //this prevents unselected races to still be highlighted
        props.clearResultsData()
        amDisplayingResults(true) //resets the view
        //props.changeLoadingStatus(false)
    }

    //alternates between if results or standings is clicked
    let [displayResultsAndNotStandings, amDisplayingResults] = useState(true);

    function highlightSelectedRace(raceId){
        //sometimes at the start, the race id is null. setting the raceId is also called in the appropriate handler functions where this function is also called (see below)
        document.querySelector(`tr[value='${raceId}']`).classList.add("selected-race");
    }

    function clearSeasonHighlights(){
        //loops through the season table rows and clears the "selected-race" class. might not be the *most* efficient way of doing this, but I might come back to it if there's time.
        document.querySelectorAll("tr[value]").forEach((tr) => {
            tr.classList.remove("selected-race")
        })
    }

  

    //handles query for qualifying AND results queries
    const resultsHandler = (e) => {
        if (e.target.value != props.selectedRaceId){
            //this helps prevent an unnecessary fetch if the results of the race id are already displayed
            props.fetchQualifyingData(e.target.value)
            props.fetchResultsData(e.target.value)
            props.fetchCircuitData(e.target.value) //a new circuit name only seems required (per the assignment) if "results" is clicked
            props.setRaceId(e.target.value)
            clearSeasonHighlights()
            highlightSelectedRace(e.target.value)
        }
        else{
            console.log("results for id= " + props.selectedRaceId + " are already displayed")
        }
        amDisplayingResults(true);
    }

    //handles query for standings button
    const standingsHandler = (e) => {
        console.log("E: " + e.target.value + "; Rid: " + props.selectedRaceId)
        if (e.target.value != props.selectedRaceId){
            //this helps prevent an unnecessary fetch if the results of the race id are already displayed
            props.fetchDriverStandingsData(e.target.value)
            props.fetchConstructorStandingsData(e.target.value)
            props.setRaceId(e.target.value)
            clearSeasonHighlights()
            highlightSelectedRace(e.target.value)
        }
        else{
            console.log("standings for id= " + props.selectedRaceId + " are already displayed")
        }
        amDisplayingResults(false);
    }

    const [isShowingAbout, showAbout] = useState(false); //boolean for opening/closing about modal
    const [isShowingFaves, showFaves] = useState(false); //^^ for faves modal
    const [faves, changeFaves] = useState({
        drivers:[], constructors:[], circuits:[]
    })
    
    function addFaveDriver(driverName){
        changeFaves(faves.drivers.push(driverName))
    }
    
    function addFaveConstructor(constructorName){
        changeFaves(faves.constructors.push(constructorName))
    }
    
    function addFaveCircuit(circuitName){
        changeFaves(faves.circuits.push(circuitName))
    }

    function emptyFaves(){
        changeFaves({
            drivers:[], constructors:[], circuits:[]
        })
    }


    return (
        <div id="container">
            <header>
                <h1>F1 Data Dashboard</h1>
                <div>
                    <Button radius="sm" color={"primary"} isDisabled={faves.length == 0 ? true : false} onClick={()=> showFaves(true)}>Favourites</Button>
                    <Button radius="sm" color={"primary"} onClick={()=> showAbout(true)}>About</Button>
                </div>
            </header>


            <div id="content">
                {/* MODALS */}
                <LoadingModal isLoading={props.isLoading} changeLoadingStatus={props.changeLoadingStatus}/>
                    {/* ^ appears when data loads */}
                <AboutModal isShowingAbout={isShowingAbout} showAbout={showAbout}/>
                <FavesModal isShowingFaves={isShowingFaves} showFaves={showFaves}
                    faves={faves} addFaveDriver={addFaveDriver} addFaveConstructor={addFaveConstructor}
                    addFaveCircuit={addFaveCircuit} emptyFaves={emptyFaves}/>


                <SeasonViewer selectedSeason={props.selectedSeason} seasonData={props.seasonData}
                    fetchQualifyingData={props.fetchQualifyingData}
                    resultsHandler={resultsHandler} standingsHandler={standingsHandler} seasonHeaderHandler={seasonHeaderHandler} />
                
                {/* IF A SESAON IS CURRENTLY SELECTED: */}
                {props.selectedSeason ? 
                <ResStnView 
                    seasonData={props.seasonData} selectedSeason={props.selectedSeason} 
                    selectedRaceId={props.selectedRaceId} setRaceId={props.setRaceId}
                    circuitData={props.circuitData} setCircuitData={props.setCurcuitData}
                    displayResultsAndNotStandings={displayResultsAndNotStandings}
                    // qualifying data
                    qualifyingData={props.qualifyingData} fetchQualifyingData={props.fetchQualifyingData}
                    //results data
                    resultsData={props.resultsData} fetchResultsData={props.fetchResultsData} resultsHandler={resultsHandler}
                    //standings data
                    driverStandingsData={props.driverStandingsData} fetchDriverStandingsData={props.fetchDriverStandingsData}
                    constructorStandingsData={props.constructorStandingsData} fetchConstructorStandingsData={props.fetchConstructorStandingsData}
                    //circuit data
                 /> 
                //  ELSE IF SEASON IS NOT SELECTED:
                :
                <div id="filler">
                    <h3>Select a year to view race data</h3>
                    <img src={loadingGif} width="300px" alt="wheel.gif"></img>
                </div>
                }
                
            </div>
        </div>
    )
}

export default HomeView