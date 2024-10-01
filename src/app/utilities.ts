import { TrainingData, Person, TrainingList, TrainingDataStringified, PersonStringified, Ex2and3DisplayData } from './types';

/* This function is called from Custom Exercise 2 to fill the 
multiselect form object with all the different training names*/
export function getTrainingsList(baseData: Person[]): string[] {
  const trainingsList = [] as string[]

  baseData.forEach((person: Person) => {
    person.completions.forEach((comp) => {
      if(!trainingsList.includes(comp.name)) {
        trainingsList.push(comp.name)
      }
    })
  })

  return trainingsList
}

/* This function is called from the Exercise 1 component and transforms the data into the TrainingList object array */
export function runTrainingCountData(baseData: Person[]) : TrainingList[] {
    let tempTrainingsList = getTrainingsList(baseData)
    let trainingCount = 0
    const tempTrainingWithCounts = [] as TrainingList[]
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

/* This function is called from the Exercise 2 component and transforms the filtered data 
into an array of people with those trainings where the timestamps are once again mm/dd/yyyy strings */
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

/* This function is internal to this utilities file and works as the sort comparison function on array.sort() */  
function compareTrainingDates(trainingA: TrainingData, trainingB: TrainingData): any {
    const diff = trainingA.timestamp.getTime() - trainingB.timestamp.getTime()
    return  diff
  }

/* This function is internal to this utilities file and takes two trainings that are the same type and compares the timestamp
properites, pushing forward the most recent one */  
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

/* This function is called from the Exercise 2 component and transforms the data into the filtered object array */  
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

/* This function is called from the Exercise 3 component and transforms the data into the filtered object array */  
export function runExpiredTrainingsFilter(baseData: Person[], checkDate: Date): Person[] {
    let expireDateAsDate = new Date()
    const filteredPersonList = [] as Person[]
    let filteredTrainings = [] as TrainingData[]
    baseData.forEach((person) => {
      person.completions.forEach((comp) => {
        if(comp.expires !== null) {
          expireDateAsDate = new Date(comp.expires)
          if(expireDateAsDate < checkDate) {
            filteredTrainings.push(comp)
          }
        }
      })
      if(filteredTrainings.length !== 0) {
        filteredPersonList.push({
          name: person.name,
          completions: filteredTrainings
        })
      }
      filteredTrainings = []
    })
    return filteredPersonList
  }

/* This function is called from the Exercise 3 component and transforms the filtered data into the object 
array of people with those expired or soon to expire trainings where the timestamps are once again mm/dd/yyyy 
strings. It also adds that expiredStatus property
*/  
export function reFormatExpiredTrainingPeople(baseData: Person[], checkDate: Date): PersonStringified[] {
    const reformattedPersonList = [] as PersonStringified[]
    let tempTrainingsList = [] as TrainingDataStringified[]
    let expireDateAsDate = new Date()

    baseData.forEach((person) => {
      person.completions.forEach((comp) => {
        if(comp.expires !== null) {
          expireDateAsDate = new Date(comp.expires)
          if(expireDateAsDate <= checkDate) {
            tempTrainingsList.push({
              name: comp.name,
              timestamp: comp.timestamp.toLocaleDateString('es-pa'),
              expires: comp.expires,
              expirationStatus: 'expired'
            })
          } else {
            tempTrainingsList.push({
              name: comp.name,
              timestamp: comp.timestamp.toLocaleDateString('es-pa'),
              expires: comp.expires,
              expirationStatus: 'expires soon'
            })
          }
        }
      })
      if(tempTrainingsList.length !== 0) {
        reformattedPersonList.push({
          name: person.name,
          completions: tempTrainingsList
        })
      }
      tempTrainingsList = []
    })

    return reformattedPersonList
  }

/* This function reformats the data from Exercise 3 (custom and default) for the display table*/  
export function formatEx3DisplayData(data: PersonStringified[]): Ex2and3DisplayData[] {
  const displayData = [] as Ex2and3DisplayData[]

  data.forEach((person) => {
    person.completions.forEach((training) => {
      displayData.push({
        name: person.name,
        trainingName: training.name,
        trainingTimestamp: training.timestamp,
        trainingExpireDate: training.expires,
        trainingExpirationStatus: training.expirationStatus
      })
    })
  })

  return displayData
}

/* This function reformats the data from Exercise 2 (custom and default) for the display table*/
export function formatEx2DisplayData(data: PersonStringified[]): Ex2and3DisplayData[] {
  const displayData = [] as Ex2and3DisplayData[]

  data.forEach((person) => {
    person.completions.forEach((training) => {
      displayData.push({
        name: person.name,
        trainingName: training.name,
        trainingTimestamp: training.timestamp,
        trainingExpireDate: training.expires,
      })
    })
  })

  return displayData
}