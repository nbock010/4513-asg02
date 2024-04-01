//import * as dotenv from 'dotenv';
// /REACT_APP_SUPA_URL=https://cwpmjmysxkqqhklusqbc.supabase.co
//REACT_APP_SUPA_ANONKEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cG1qbXlzeGtxcWhrbHVzcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTkwNDYsImV4cCI6MjAyNDM3NTA0Nn0.yUNE4b3mGoNYpks3924WC5uQclycl-cuLjgm8OprDfg
import { useState, useEffect } from 'react'
import './App.css'
import './Login.jsx'
import './home-views/HomeView.jsx'
import { createClient } from '@supabase/supabase-js';
import Login from './Login.jsx'
import HomeView from './home-views/HomeView.jsx';

//import './Queries.js';
//^^ IF YOU CAN FIGURE OUT HOW TO PUT QUERIES IN ANOTHER FILE
const supaUrl = 'https://cwpmjmysxkqqhklusqbc.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cG1qbXlzeGtxcWhrbHVzcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTkwNDYsImV4cCI6MjAyNDM3NTA0Nn0.yUNE4b3mGoNYpks3924WC5uQclycl-cuLjgm8OprDfg';
const supabase = createClient(supaUrl, supaAnonKey);


function App() {
  console.clear(); // just to remove previous messages of past renders. no need to clog up the console.
  console.log("---------------------")

  //LOGIN FUNCTIONS
  const [loggedIn, changeLoginStatus] = useState(0);
  //console.log("Logged in: " + loggedIn);

  const loginHandler = () => {
    changeLoginStatus(true);
  }

  //API CODE?
  const [selectedSeason, setSeason] = useState(); //default per the select element. 
  const [seasonData, setSeasonData] = useState([]);

  const [selectedRaceId, setRaceId] = useState();
  const [qualifyingData, setQualifyingData] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  const [driverStandingsData, setDriverStandingsData] = useState([]);
  const [constructorStandingsData, setConstructorStandingsData] = useState([]);


  //FETCH SEASON DATA
  async function fetchSeasonData(year) {
    // if (!year) {
    //   console.log("possible error: fetchSeasonYear was called but there's no year")
    // }
    //else
    if (year) {
      console.log("getting Season data from supabase ...here to check if I've gone infinite");

      const { data, error } = await supabase
        .from('race')
        .select('raceId, year, round, circuitId, name, date, time, url')
        .eq('year', year)
        .order('round', { ascending: true });
      //the select could also just be () but there are a lot of unnecessary null columns
      if (error) {
        console.error('Error fetching seasons:', error);
        return;
      }
      setSeasonData(data);
    }

  }

  //FETCH QUALIFYING DATA
  async function fetchQualifyingData(raceId) {
    // if (!raceId && loggedIn) {
    //   console.log("possible error: fetchQualifyingData was called but there's no raceId")
    // }
    // //blocks attempt at fetch if there's no raceId yet; no point making a knowingly null request
    // else
    if (raceId) {
      console.log("getting qualifying data from supabase ...here to check if I've gone infinite");

      const { data, error } = await supabase
        .from('qualifying')
        .select(`race!inner(raceId, name, round, year, date),
          driver!inner(driverId, forename, surname, dob, nationality, url), 
          constructor!inner(name, nationality, url), 
          position, q1, q2, q3`)
        .eq('race.raceId', raceId)
        .order('position', { ascending: true })
      if (error) {
        console.error('Error fetching qualifying:', error);
        return;
      }
      setQualifyingData(data);
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for qualifying")
        //document.querySelector("#no-qualifying-p").innerHTML = "No qualifying data found for this race. Please select another"
      }
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
    // if (!raceId && loggedIn) {
    //   console.log("possible error: fetchResultsData was called but there's no raceId")
    // }
    // //blocks attempt at fetch if there's no raceId yet; no point making a knowingly null request
    // else
    if (raceId) {
      console.log("getting results data from supabase ...here to check if I've gone infinite: " + raceId);

      const { data, error } = await supabase
        .from('result')
        .select(`driver!inner(driverId, forename, surname, dob, nationality, url), 
        race!inner(name, round, year, date), 
        constructor!inner(name, nationality), 
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
    }
  }

  //FETCH DRIVER STANDINGS DATA
  async function fetchDriverStandingsData(raceId) {
    if (raceId) {
      console.log("getting results data from supabase ...here to check if I've gone infinite: " + raceId);
      const { data, error } = await supabase
        .from('driverStanding')
        .select(`driverStandingsId, 
              driver!inner(driverId, forename, surname, dob, nationality), 
              race!inner(name, round, year, date), 
              points, position, wins`)
        .eq('raceId', raceId)
        .order('position', { ascending: true });

      setDriverStandingsData(data)
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for results")
        document.querySelector("#no-driverStandings-p").textContent = "No driver standings found for this race. Please select another"
      }
    }
  }

  //FETCH CONSTRUCTOR STANDINGS DATA
  async function fetchConstructorStandingsData(raceId) {
    if (raceId) {
      console.log("getting results data from supabase ...here to check if I've gone infinite: " + raceId);
      const { data, error } = await supabase
        .from('constructorStanding')
        .select(`constructorStandingsId, 
        constructor!inner(name, nationality, url), 
        race!inner(name, round, year, date), 
        points, position, wins`)
        .eq('raceId', raceId)
        .order('position', { ascending: true });

      setConstructorStandingsData(data)
      if (data.length == 0) {
        console.log("Query appears successful, but may have returned zero results for results")
        document.querySelector("#no-constructorStandings-p").textContent = "No driver standings found for this race. Please select another"
      }
    }
  }


  // DISPLAY LOGIN OR HOMEVIEW
  if (!loggedIn) {
    return <Login loginHandler={loginHandler}></Login>
  }
  else {
    return <HomeView seasonData={seasonData} fetchSeasonData={fetchSeasonData}
      selectedSeason={selectedSeason} setSeason={setSeason}
      selectedRaceId={selectedRaceId} setRaceId={setRaceId}
      qualifyingData={qualifyingData} fetchQualifyingData={fetchQualifyingData}
      resultsData={resultsData} fetchResultsData={fetchResultsData}
      driverStandingsData={driverStandingsData} fetchDriverStandingsData={fetchDriverStandingsData}
      constructorStandingsData={constructorStandingsData} fetchConstructorStandingsData={fetchConstructorStandingsData} />
  }
}

export default App
