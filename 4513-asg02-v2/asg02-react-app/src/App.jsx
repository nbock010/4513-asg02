import { useState, useEffect } from 'react'
import {NextUIProvider} from "@nextui-org/react";

import './Login.jsx'
import './home-views/HomeView.jsx'
import { createClient } from '@supabase/supabase-js';
import Login from './Login.jsx'
import HomeView from './home-views/HomeView.jsx';
const supaUrl = 'https://cwpmjmysxkqqhklusqbc.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cG1qbXlzeGtxcWhrbHVzcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTkwNDYsImV4cCI6MjAyNDM3NTA0Nn0.yUNE4b3mGoNYpks3924WC5uQclycl-cuLjgm8OprDfg';

const supabase = createClient(supaUrl, supaAnonKey);


function App() {
  useEffect(() =>{
    console.clear() //no need to have it always clogged up when im constantly reloading
  },[])

  //console.clear(); // just to remove previous messages of past renders. no need to clog up the console.
  console.log("---------------------")

  //LOGIN FUNCTION
  const [loggedIn, changeLoginStatus] = useState(0);
  const loginHandler = () => {
    changeLoginStatus(true);
  }

  const [selectedSeason, setSeason] = useState(); //default per the select element. 
  const [seasonData, setSeasonData] = useState([]);

  const [selectedRaceId, setRaceId] = useState();
  const [qualifyingData, setQualifyingData] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  const [driverStandingsData, setDriverStandingsData] = useState([]);
  const [constructorStandingsData, setConstructorStandingsData] = useState([]);

  const [circuitData, setCircuitData] = useState([]);

  const [isLoading, changeLoadingStatus] = useState(false); //true or false to determine whether to display loading modal

  function clearResultsData(){
    //ONLY TO BE USED ON REFRESH OF A NEW SELECTED SEASON
    setRaceId([])
    setQualifyingData([])
    setResultsData([])
    setQualifyingData([])
    setDriverStandingsData([])
    setConstructorStandingsData([])
    setCircuitData([])
}


  //FETCH SEASON DATA
  async function fetchSeasonData(year) {
    if (year) {
      changeLoadingStatus(true)
      console.log("getting Season data from supabase ...here to check if I've gone infinite");

      const { data, error } = await supabase
        .from('race')
        .select('raceId, year, round, circuitId, name, date, time, url')
        .eq('year', year)
        .order('round', { ascending: true });
      //the select could also just be () but there are a lot of unnecessary null columns
      if (error) {
        console.error('Error fetching seasons:', error);
        changeLoadingStatus(false)
        return;
      }
      setSeasonData(data)
      changeLoadingStatus(false)
    }

  }

  //FETCH QUALIFYING DATA
  async function fetchQualifyingData(raceId) {
    if (raceId) {
      changeLoadingStatus(true)
      console.log("getting qualifying data from supabase ...here to check if I've gone infinite");

      const { data, error } = await supabase
        .from('qualifying')
        .select(`race!inner(raceId, name, round, year, date),
          driver!inner(driverId, forename, surname, dob, nationality, url), 
          constructor!inner(constructorId, name, nationality, url), 
          position, q1, q2, q3`)
        .eq('race.raceId', raceId)
        .order('position', { ascending: true })
      if (error) {
        console.error('Error fetching qualifying:', error);
        return;
      }
      
      if (data.length > 0) {
        setQualifyingData(data);
      }
      else{
        console.log("Query appears successful, but may have returned zero results for qualifying")
        setQualifyingData("0")
        //document.querySelector("#no-qualifying-p").innerHTML = "No qualifying data found for this race. Please select another
      }
      changeLoadingStatus(false)
    }
  }

  /* Since I can't cast values such as position or points to ints (which are actually strings
    in the original DB), I'll do it here.*/
  function castAndResortData(resultData) {
    let copy = resultData
    copy.map(d => parseInt(d.position))
    copy.map(d => d.points = parseInt(d.points))
    copy.sort((a, b) => b.points - a.points)
    //^^points descending is basically position ascending, but allows nulls to get shoved to the bottom of the sorting
    copy.map(d => d.position ? {} : d.position = copy.indexOf(d) + 1)
    // ^^ some positions are coming back as null; we can artificially place one in, since the entries are already sorted by points.
    return copy
  }

  //FETCH RESULTS DATA
  async function fetchResultsData(raceId) {
    if (raceId) {
      console.log("getting results data from supabase ...here to check if I've gone infinite: " + raceId);
      changeLoadingStatus(true)
      const { data, error } = await supabase
        .from('result')
        .select(`driver!inner(driverId, forename, surname, dob, nationality, url), 
        race!inner(name, round, year, date), 
        constructor!inner(constructorId, name, nationality, url), 
        position, points, laps, time`)
        .eq('race.raceId', raceId);
      //.order('position', { ascending: true }); //WE'LL SORT THEM AFTER THE POSITIONS ARE CAST TO INTS
      if (error) {
        console.error('Error fetching results:', error);
        return;
      }

      setResultsData(castAndResortData(data))
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for results")
        document.querySelector("#no-results-p").textContent = "No results data found for this race. Please select another"
      }
      changeLoadingStatus(false)
    }
    else{
      console.log("we were called, but no raceId...")
    }
  }

  //FETCH DRIVER STANDINGS DATA
  async function fetchDriverStandingsData(raceId) {
    if (raceId) {
      changeLoadingStatus(true)
      console.log("LOADING")
      console.log("getting driver standings data from supabase ...here to check if I've gone infinite: " + raceId);
      const { data, error } = await supabase
        .from('driverStanding')
        .select(`driverStandingsId, 
              driver!inner(driverId, forename, surname, dob, nationality, url), 
              race!inner(name, round, year, date), 
              points, position, wins`)
        .eq('raceId', raceId)
        .order('position', { ascending: true });

      setDriverStandingsData(data)
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for driver standings")
        document.querySelector("#no-driverStandings-p").textContent = "No driver standings found for this race. Please select another"
      }
      changeLoadingStatus(false)
    }
  }

  //FETCH CONSTRUCTOR STANDINGS DATA
  async function fetchConstructorStandingsData(raceId) {
    if (raceId) {
      changeLoadingStatus(true)
      
      console.log("getting constructor standings data from supabase ...here to check if I've gone infinite: " + raceId);
      const { data, error } = await supabase
        .from('constructorStanding')
        .select(`constructorStandingsId, 
        constructor!inner(constructorId, name, nationality, url), 
        race!inner(name, round, year, date), 
        points, position, wins`)
        .eq('raceId', raceId)
        .order('position', { ascending: true });

      setConstructorStandingsData(data)
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for constructor standings")
        document.querySelector("#no-constructorStandings-p").textContent = "No driver standings found for this race. Please select another"
      }
      changeLoadingStatus(false)
    }
  }

  //FETCH CIRCUIT DATA
  async function fetchCircuitData(raceId){
    if (raceId){
      changeLoadingStatus(true)
      console.log("getting circuit data from supabase ...here to check if I've gone infinite: " + raceId);
      const {data, error} = await supabase
        .from('race')
        .select(`circuits!inner(name, location, country, lat, lng, url)`)
        .eq('raceId', raceId);
      setCircuitData(data)
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for results")
        //set somethings text content?
      }
      changeLoadingStatus(false)
    }
  }


  // DISPLAY LOGIN OR HOMEVIEW
  if (!loggedIn) {
    return (
      <NextUIProvider>
        <Login loginHandler={loginHandler}></Login>
      </NextUIProvider>
    )
  }
  else {
    return (
      <NextUIProvider>
        <HomeView seasonData={seasonData} fetchSeasonData={fetchSeasonData}
          selectedSeason={selectedSeason} setSeason={setSeason}
          selectedRaceId={selectedRaceId} setRaceId={setRaceId}
          circuitData={circuitData} fetchCircuitData={fetchCircuitData}
          qualifyingData={qualifyingData} fetchQualifyingData={fetchQualifyingData}
          resultsData={resultsData} fetchResultsData={fetchResultsData}
          driverStandingsData={driverStandingsData} fetchDriverStandingsData={fetchDriverStandingsData}
          constructorStandingsData={constructorStandingsData} fetchConstructorStandingsData={fetchConstructorStandingsData} 
          isLoading={isLoading} changeLoadingStatus={changeLoadingStatus}
          clearResultsData={clearResultsData}/>
      </NextUIProvider>
    )
  }
}

export default App
