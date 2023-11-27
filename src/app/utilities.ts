import { TrainingData, Person, TrainingList, TrainingDataStringified } from './types';

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

  export function reFormatDateStrings(completions: TrainingData[]): TrainingDataStringified[]
  {
    let convertedTrainingData = [] as TrainingDataStringified[]
    completions.forEach((comp) => {
      convertedTrainingData.push({
        name: comp.name,
        timestamp: comp.timestamp.toLocaleDateString('es-pa'),
        expires: comp.expires
      })
    })

    return convertedTrainingData
  }

  function compareTrainingDates(trainingA: TrainingData, trainingB: TrainingData): any {
    const diff = trainingA.timestamp.getTime() - trainingB.timestamp.getTime()
    console.log('diff', diff)
    return  diff
  }

  function pruneTrainings(trainingsData: TrainingData[]) : TrainingData[] {
    let tempNewTrainingData = [] as TrainingData[]
    let seen = new Set();
    let dupeHolder = [] as TrainingData[]
    let postPruneTrainingData = [] as TrainingData[]
    let mostRecent = {} as TrainingData
    var hasDuplicates = trainingsData.some(function(currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });
    
    if(hasDuplicates) {
      seen.forEach((value) => {
        trainingsData.forEach((training) => {
          if(training.name === value) {
            dupeHolder.push(training)
          } else {
            tempNewTrainingData.push(training)
          }
        })
      })
      postPruneTrainingData = dupeHolder.sort(compareTrainingDates)
      mostRecent = postPruneTrainingData[dupeHolder.length - 1]
      tempNewTrainingData.push(mostRecent)
    }
    return tempNewTrainingData
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
    let newTempTrainings = [] as TrainingData[]
    baseData.forEach((person: Person) => {
      person.completions.forEach((comp) => {
        trainings.forEach((trainingType) => {
          if(comp.name === trainingType && comp.timestamp >= minDate && comp.timestamp <= maxDate) {
            tempTrainings.push(comp)
          }
        })
      })
      if(tempTrainings.length > 1) {
        newTempTrainings = pruneTrainings(tempTrainings)
      } else if(tempTrainings.length === 1) {
        newTempTrainings.push(tempTrainings[0])
      }
      if(newTempTrainings.length !== 0){
        console.log(person.name, newTempTrainings)
        tempPeopleList.push({
          name: person.name,
          completions: newTempTrainings
        })
      }
      tempTrainings = []
      newTempTrainings = []
    })
    return tempPeopleList
  }