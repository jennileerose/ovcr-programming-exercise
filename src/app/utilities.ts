import { TrainingData, Person, TrainingList } from './types';

export function runTrainingCountData(baseData: Person[]) : TrainingList[] {
    let tempTrainingsList = [] as string[]
    let trainingCount = 0
    const tempTrainingWithCounts = [] as TrainingList[]
    baseData.forEach((person: Person) => {
      person.completions.forEach((comp) => {
        if(!tempTrainingsList.includes(comp.name)) {
          tempTrainingsList.push(comp.name)
        }
      })
    })
    tempTrainingsList.forEach((training) => {
      baseData.forEach((person) => {
        person.completions.forEach((comp) => {
          if(training === comp.name) {
            trainingCount += 1
          }
        })
      })
      tempTrainingWithCounts.push({
        name: training,
        count: trainingCount
      })
      trainingCount = 0
    })
    return tempTrainingWithCounts
  }

  export function runTrainingInFiscalYear(
    baseData: Person[],
    fiscalYear: number,
    trainings: string[]
    ) : Person[] {
    let minDate = new Date("7/1/" + (fiscalYear-1).toString())
    let maxDate = new Date("6/30/" + fiscalYear.toString())
    let tempPeopleList = [] as Person[]
    let tempTrainings = [] as TrainingData[]
    let pruneDupeTrainings = [] as TrainingData[]
    let finalPeopleList = [] as Person[]
    baseData.forEach((person: Person) => {
      person.completions.forEach((comp) => {
        let trainingDate = new Date(comp.timestamp)
        trainings.forEach((trainingType) => {
          if(comp.name === trainingType && trainingDate >= minDate && trainingDate <= maxDate) {
            tempTrainings.push(comp)
          }
        })
      })
      if(tempTrainings.length !== 0) {
        tempPeopleList.push({
          name: person.name,
          completions: tempTrainings
        })
        tempTrainings = []
      }
    })
    // tempPeopleList.forEach((person2) => {
    //   person2.completions.forEach((comp2, comp2Index)=> {
        
    //   })
    // })
    return tempPeopleList
  }