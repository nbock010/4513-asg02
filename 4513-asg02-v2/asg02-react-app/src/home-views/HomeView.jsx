import { useState, useEffect } from 'react'
import SeasonViewer from './season-views/SeasonViewer.jsx';
import ResStnView from './ResStnView.jsx'
//import Modal from 'react-modal'

const HomeView = (props) => {
    /*props = props.seasonData, props.fetchSeasonData (function), 
    props.selectedSeason, props.setSeason (function),

    props.selectedRaceId, props.setRaceId,
    props.qualifyingData, props.fetchQualifying(),
    props.resultsData, props.fetchResultsData(raceId),

    driverStandingsData = =props.driverStandingsData, fetchDriverStandingsData= props.fetchDriverStandingsData(raceId)
    constructorStandingsData = props.constructorStandingsData fetchConstructorStandingsData = props.fetchConstructorStandingsData(raceId)
*/
    //console.log("homeview loaded")
    useEffect(() => {
        console.log("homeview -> useEffect, selectedSeason: " + props.selectedSeason)
        props.fetchSeasonData(props.selectedSeason)
    }, []);

    console.log("qualifying data for " + props.selectedRaceId)
    console.log(props.qualifyingData)

    console.log("results data for " + props.selectedRaceId)
    console.log(props.resultsData)

    console.log('driver standings data for ' + props.selectedRaceId)
    console.log(props.driverStandingsData)

    console.log('constructor standings data for :' + props.selectedRaceId)
    console.log(props.constructorStandingsData)


    //HANDLER FOR SEASON DROPDOWN
    const seasonHeaderHandler = (e) => {
        // console.log("Season value from dropdown: " + e.target.value);
        props.setSeason(e.target.value);
        props.fetchSeasonData(e.target.value); //using value rather than props.selectedSeason because the delay causes a fetch of the *previously* selected year.
        //CHANGE HEADER
        document.querySelector("#seasonH3").textContent = (e.target.value + " Races");
        //NOTE: when you set up the circuit name, a function here might be good for another api call
    }

    //alternates between if results or standings is clicked
    let [displayResultsAndNotStandings, amDisplayingResults] = useState(true);

    //handles query for qualifying AND results queries
    const resultsHandler = (e) => {
        // console.log("results clicked: " + e.target.value)
        props.fetchQualifyingData(e.target.value)
        props.fetchResultsData(e.target.value)
        amDisplayingResults(true);
    }

    const standingsHandler = (e) => {
        console.log("standings clicked: " + e.target.value)
        props.fetchDriverStandingsData(e.target.value)
        props.fetchConstructorStandingsData(e.target.value)
        amDisplayingResults(false);
        //fetch driver standings, fetch constructor standings
    }

    const tempBtnAlert = () => {
        console.log("Button function under construction...")
    }


    return (
        <div className="container">
            <header>
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
                <h2>F1 Data Dashboard</h2>
                <div>
                    <button onClick={tempBtnAlert}>Favourites</button>
                    <button onClick={tempBtnAlert}>About</button>
                </div>
            </header>

            <div id="content">
                <SeasonViewer selectedSeason={props.selectedSeason} seasonData={props.seasonData}
                    fetchQualifyingData={props.fetchQualifyingData}
                    resultsHandler={resultsHandler} standingsHandler={standingsHandler} />

                {/* Views for results+qualifying and standings */}
                <ResStnView resultsHandler={resultsHandler}
                    selectedRaceId={props.selectedRaceId} setRaceId={props.setRaceId}
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
            </div>
        </div>
    )
}

export default HomeView