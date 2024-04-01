import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Login.jsx'

import { createClient } from '@supabase/supabase-js';

//note to self: and move below into env folder, set git to gitignore *.env?
const supaUrl = 'https://cwpmjmysxkqqhklusqbc.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cG1qbXlzeGtxcWhrbHVzcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTkwNDYsImV4cCI6MjAyNDM3NTA0Nn0.yUNE4b3mGoNYpks3924WC5uQclycl-cuLjgm8OprDfg';
const supabase = createClient(supaUrl, supaAnonKey);


function App() {

  //const [count, setCount] = useState(0)
  const [seasons, setSeasons] = useState(0)

  useEffect(() => {
    selectSeasons();
  }, []);

  async function selectSeasons() {
    console.log("getting from supabase ...here to check if I've gone infinite");
    // uses the same API as your assign 1 solutions
    const { data, error } = await supabase
      .from('season')
      .select('*');
    if (error) {
      console.error('Error fetching seasons:', error);
      return;
    }
    setSeasons(data);
    console.log(seasons);
  }
  return (
    <p>init testing</p>
  )
}

export default App

//old return code, just in case
// <>
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src={viteLogo} className="logo" alt="Vite logo" />
//     </a>
//     <a href="https://react.dev" target="_blank">
//       <img src={reactLogo} className="logo react" alt="React logo" />
//     </a>
//   </div>
//   <h1>Vite + React</h1>
//   <div className="card">
//     <button onClick={() => setCount((count) => count + 1)}>
//       count is {count}
//     </button>
//     <p>
//       Edit <code>src/App.jsx</code> and save to test HMR
//     </p>
//   </div>
//   <p className="read-the-docs">
//     Click on the Vite and React logos to learn more
//   </p>
// </>
