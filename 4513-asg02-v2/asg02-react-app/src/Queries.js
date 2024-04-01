import { createClient } from '@supabase/supabase-js';
const supaUrl = 'https://cwpmjmysxkqqhklusqbc.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cG1qbXlzeGtxcWhrbHVzcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTkwNDYsImV4cCI6MjAyNDM3NTA0Nn0.yUNE4b3mGoNYpks3924WC5uQclycl-cuLjgm8OprDfg';
//const supaUrl = keys.supaUrl;
//const supAnonKey = keys.supaAnonKey;
export const supabase = createClient(supaUrl, supaAnonKey);

//FETCH SEASON DATA
export async function seasonDataQuery(year) {
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
  else {
    return data;
  }
  //   }
  //   setSeasonData(data);
  // }

}

//FETCH QUALIFYING DATA
export async function fetchQualifyingData(raceId) {
  if (!raceId && loggedIn) {
    console.log("possible error: fetchQualifyingData was called but there's no raceId")
  }
  //blocks attempt at fetch if there's no raceId yet; no point making a knowingly null request
  else if (raceId) {
    console.log("getting qualifying data from supabase ...here to check if I've gone infinite");

    const { data, error } = await supabase
      .from('qualifying')
      .select(`race!inner(raceId, name, round, year, date),
          driver!inner(driverRef, code, forename, surname, url), 
          constructor!inner(name, constructorRef, nationality, url), 
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
    }
  }
}

/* Since I can't cast values such as position or points to ints (which are actually strings
  in the original DB), I'll do it here.*/
export function castAndResortData(resultData) {
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
export async function fetchResultsData(raceId) {
  if (!raceId && loggedIn) {
    console.log("possible error: fetchResultsData was called but there's no raceId")
  }
  //blocks attempt at fetch if there's no raceId yet; no point making a knowingly null request
  else if (raceId) {
    console.log("getting results data from supabase ...here to check if I've gone infinite: " + raceId);

    const { data, error } = await supabase
      .from('result')
      .select(`driver!inner(driverRef, code, forename, surname, url), 
        race!inner(name, round, year, date), 
        constructor!inner(name, constructorRef, nationality), 
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
    }
  }
}

//export default (fetchQualifyingData, fetchResultsData, fetchSeasonData)
