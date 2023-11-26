import { promises as fs } from 'fs';
import { TrainingData, Person, TrainingList } from './types';

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
  const runTrainingCountData = () => {
    let tempTrainingsList = [] as TrainingList[]
    
    baseData.forEach((person: Person) => {
      person.completions.forEach((comp) => {

      })
    })
  }
  return (
    <main>
      <div>
        <p>Click Each button to download the requested JSON Files</p>
        <p><button>Show completed Training counts</button></p>
        <p><button>Show List of trainings in Fiscal Year 2024</button></p>
        <p><button>Show expired trainings for 10-1-2023</button></p>
      </div>
      <div id="showData">
        <p>Click a button to download new JSON files with needed Data</p>
        {/* <h1>{data[0].name}</h1>
        <p>{data[0].completions[1].name}</p> */}
      </div>
      
    </main>
  )
}
