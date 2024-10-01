import { promises as fs } from 'fs';
import { TrainingData, Person } from './types';
import HomeTabs from './homeTabs';
// import { changeTab } from './utilities';
// // import in each of the exercise sections
// import Exercise1 from './exercises/exercise1';
// import Exercise2 from './exercises/exercise2';
// import Exercise3 from './exercises/exercise3';

/******************************************************
This is the main page where the application code starts. 
All functions that involve manipulatationg the data
beyond this initial setup (the code below) is in 
the ./utilities.ts file which is called from the different
Exercise components. 
All the type definitions are in the ./types.d.ts file 
******************************************************/

export default async function Home() {
  
  // import the file with the trainings data
  const file = await fs.readFile(process.cwd() + '/src/app/trainings.json', 'utf8');
  // parse the data from json into an array of objects
  const data = JSON.parse(file);
  // set up our base array of data objects
  const baseData = [] as Person[];
  // cycle through the array and set up the timestamps as Dates for ease of use in exercises
  data.forEach((datapoint: Person) => {
    let tempCompletions = [] as TrainingData[]
    datapoint.completions.forEach((comp: TrainingData) => {
      tempCompletions.push({
        name: comp.name,
        timestamp: new Date(comp.timestamp),
        expires: comp.expires
      })
    })
    baseData.push({
      name: datapoint.name,
      completions: tempCompletions
    })
    tempCompletions = []
  })
  
  return (
    // This is the html main page code. This displays each of the exercises in a seperate Tab using the HomeTabs component
    <>
      <header className='header'>
          <h1>Programming Exercise for OVCR by Jennilee Benda</h1>
      </header>
      <main className="main">
        <p>This site uses the supplied trainings file automatically on page load. For the new Oct 01 2024 version, I have improved some of my previous code and added two new exercise options for exercises 2 and 3 which allow the user to select custom paramters in a form.</p>
        <HomeTabs baseData={baseData}/>
      </main>
      <footer className="footer">
        This code was created by <a href="http://www.jennileerosedesigns.com" target="_blank">Jennilee Benda</a>
      </footer>      
    </>
  )
}
