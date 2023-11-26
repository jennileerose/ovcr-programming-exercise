import { promises as fs } from 'fs';
import { TrainingData, Person, TrainingList } from './types';
import Exercise1 from './exercises/exercise1';
import Exercise2 from './exercises/exercise2';
import Exercise3 from './exercises/exercise3';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/trainings.json', 'utf8');
  const data = JSON.parse(file);
  const baseData = [] as Person[];
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
              <Exercise1 baseData={baseData} />
              <br />
              <Exercise2 baseData={baseData} />
              <br />
              <Exercise3 baseData={baseData} />
            </div>
            <div id="showData">
              {/* <h1>{data[0].name}</h1>
                <p>{data[0].completions[1].name}</p> */}
            </div>
      </main>      
    </>
  )
}
