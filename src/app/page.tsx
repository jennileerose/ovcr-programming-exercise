import { promises as fs } from 'fs';
import { TrainingData, Person, TrainingList } from './types';
import Exercise1 from './exercises/exercise1';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/trainings.json', 'utf8');
  const data = JSON.parse(file);
  const baseData = [] as Person[];
  let trainingList = [] as TrainingList[]
  data.forEach((datapoint: Person, datapointIndex: number) => {
    let tempCompletions = [] as TrainingData[]
    datapoint.completions.forEach((comp: TrainingData) => {
      tempCompletions.push({
        name: comp.name,
        timestamp: comp.timestamp,
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
    <>
      <header>
          <h1>Programming Exercise for OVCR by Jennilee Benda</h1>
        </header>
        <main className="main">
            <div>
              <p>Click Each button to download the requested JSON Files</p>
              <br />
              <Exercise1 baseData = {baseData} />
              <br />
              <p>Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
              <p>Trainings = `&quot;`Electrical Safety for Labs`&quot;`, `&quot;`X-Ray Safety`&quot;`, `&quot;`Laboratory Safety Training`&quot;`; Fiscal Year = 2024</p>
              <p><button className="button">Download JSON file</button></p>
              <br />
              <p>Given a date, find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
              <p><button className="button">Download JSON file</button></p>
            </div>
            <div id="showData">
              {/* <h1>{data[0].name}</h1>
                <p>{data[0].completions[1].name}</p> */}
            </div>
      </main>      
    </>
  )
}
