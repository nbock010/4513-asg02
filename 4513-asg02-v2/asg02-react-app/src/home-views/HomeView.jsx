import { useState, useEffect } from 'react'
import SeasonViewer from './season-views/SeasonViewer.jsx';
import ResStnView from './ResStnView.jsx'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import LoadingModal from '../dialogs/LoadingModal.jsx';

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
    //console.log("homeview loaded")
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

// const [isLoading, changeLoadingStatus] = useState(false); //true or false to determine whether to display loading modal


    //HANDLER FOR SEASON DROPDOWN
    //NextUi update: e is no longer the event target, it will be the key (i.e. the year) selected
    const seasonHeaderHandler = (key) => {
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

    const tempBtnAlert = () => {
        console.log("Button function under construction...")
    }


    return (
        <div className="container">
            <header>
            <h1>F1 Data Dashboard</h1>
                <div className="season-selector">
                    <h3>Season</h3>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button color='primary' radius="sm">
                                {props.selectedSeason ? props.selectedSeason : "Year"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu disallowEmptySelection aria-label="Season selector" selectionMode="single" variant='flat'
                         onAction={(key) => seasonHeaderHandler(key)}>
                            {/* <DropdownItem value="">----</DropdownItem> */}
                            <DropdownItem key="2000">2000</DropdownItem>
                            <DropdownItem key="2001">2001</DropdownItem>
                            <DropdownItem key="2002">2002</DropdownItem>
                            <DropdownItem key="2003">2003</DropdownItem>
                            <DropdownItem key="2004">2004</DropdownItem>
                            <DropdownItem key="2005">2005</DropdownItem>
                            <DropdownItem key="2006">2006</DropdownItem>
                            <DropdownItem key="2007">2007</DropdownItem>
                            <DropdownItem key="2008">2008</DropdownItem>
                            <DropdownItem key="2009">2009</DropdownItem>
                            <DropdownItem key="2010">2010</DropdownItem>
                            <DropdownItem key="2011">2011</DropdownItem>
                            <DropdownItem key="2012">2012</DropdownItem>
                            <DropdownItem key="2013">2013</DropdownItem>
                            <DropdownItem key="2014">2014</DropdownItem>
                            <DropdownItem key="2015">2015</DropdownItem>
                            <DropdownItem key="2016">2016</DropdownItem>
                            <DropdownItem key="2017">2017</DropdownItem>
                            <DropdownItem key="2018">2018</DropdownItem>
                            <DropdownItem key="2019">2019</DropdownItem>
                            <DropdownItem key="2020">2020</DropdownItem>
                            <DropdownItem key="2021">2021</DropdownItem>
                            <DropdownItem key="2022">2022</DropdownItem>
                            <DropdownItem key="2023">2023</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <Button radius="sm" color={"primary"} onClick={tempBtnAlert}>Favourites</Button>
                    <Button radius="sm" color={"primary"} onClick={tempBtnAlert}>About</Button>
                </div>
            </header>

            <LoadingModal isLoading={props.isLoading} changeLoadingStatus={props.changeLoadingStatus}></LoadingModal>
            <div id="content">
                <SeasonViewer selectedSeason={props.selectedSeason} seasonData={props.seasonData}
                    fetchQualifyingData={props.fetchQualifyingData}
                    resultsHandler={resultsHandler} standingsHandler={standingsHandler} />

                {/* IF A SESAON IS CURRENTLY SELECTED: */}
                {props.selectedSeason ? 
                <ResStnView seasonData={props.seasonData} selectedSeason={props.selectedSeason} resultsHandler={resultsHandler}
                selectedRaceId={props.selectedRaceId} setRaceId={props.setRaceId}
                circuitData={props.circuitData} setCircuitData={props.setCurcuitData}
                displayResultsAndNotStandings={displayResultsAndNotStandings}
                // qualifying data
                qualifyingData={props.qualifyingData} fetchQualifyingData={props.fetchQualifyingData}
                //results data
                resultsData={props.resultsData} fetchResultsData={props.fetchResultsData}
                //standings data
                driverStandingsData={props.driverStandingsData} fetchDriverStandingsData={props.fetchDriverStandingsData}
                constructorStandingsData={props.constructorStandingsData} fetchConstructorStandingsData={props.fetchConstructorStandingsData}
                //circuit data
                 /> 
                //  ELSE IF SEASON IS NOT SELECTED:
                :
                <div>
                    <h3>Select a year to view race data</h3>
                </div>
                }
                
            </div>
        </div>
    )
}

export default HomeView