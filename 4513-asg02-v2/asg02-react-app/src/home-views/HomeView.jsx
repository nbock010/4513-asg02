import { useState, useEffect } from 'react'
import SeasonViewer from './season-views/SeasonViewer.jsx';
import ResStnView from './ResStnView.jsx'
import { Button } from '@nextui-org/react'


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
    const seasonHeaderHandler = (e) => {
        //props.changeLoadingStatus(true)
        props.setSeason(e.target.value);
        props.fetchSeasonData(e.target.value); //using value rather than props.selectedSeason because the delay causes a fetch of the *previously* selected year.
        //CHANGE HEADER (if one is loaded yet; this 'if' prevents a null error)
        if (document.querySelector("#seasonH3")){
            document.querySelector("#seasonH3").textContent = (e.target.value + " Races");
        }
        clearSeasonHighlights()
        props.clearResultsData()
        amDisplayingResults(true)
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
                    <select name="season" onChange={seasonHeaderHandler}>
                        <option value="">----</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div>
                    <Button color={"primary"} onClick={tempBtnAlert}>Favourites</Button>
                    <Button color={"primary"} onClick={tempBtnAlert}>About</Button>
                </div>
            </header>


            <div id="content">
                <SeasonViewer selectedSeason={props.selectedSeason} seasonData={props.seasonData}
                    fetchQualifyingData={props.fetchQualifyingData}
                    resultsHandler={resultsHandler} standingsHandler={standingsHandler} />

                {/* IF A SESAON IS CURRENTLY SELECTED: */}
                {props.selectedSeason ? 
                <ResStnView selectedSeason={props.selectedSeason} resultsHandler={resultsHandler}
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