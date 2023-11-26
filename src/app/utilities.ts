import { TrainingData, Person, TrainingList } from './types';

export function runTrainingCountData(baseData: Person[]) : TrainingList[] {
    let tempTrainingsList = [] as string[]
    let trainingCount = 0
    const tempTrainingWithCounts = [] as TrainingList[]
    baseData.forEach((person: Person) => {
      person.completions.forEach((comp) => {
        if(tempTrainingsList.length === 0 || !tempTrainingsList.includes(comp.name)) {
          tempTrainingsList.push(comp.name)
        }
      })
    })
    tempTrainingsList.forEach((training) => {
      baseData.forEach((person) => {
        person.completions.forEach((comp) => {
          if(training === comp.name) {
            trainingCount =+ 1
          }
        })
      })
      tempTrainingWithCounts.push({
        trainingName: training,
        count: trainingCount
      })
      trainingCount = 0
    })
    return tempTrainingWithCounts
  }