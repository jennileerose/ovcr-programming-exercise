'use client'
import { useState } from 'react'
import { TrainingList, Person } from '../types'
import { runTrainingCountData } from '../utilities';

export default function Exercise1({baseData}:{baseData: Person[]}){
    
    const [trainingList, setTrainingList] = useState<TrainingList[]>([])
    
    function getTrainingsListWithCounts() {
        // use the utilities function runTrainingCountData to get the counts from the data
        const newData = runTrainingCountData(baseData)
        setTrainingList(newData)
        // console.log(newData)
        // transform into JSON and export for download
        const jsonString = JSON.stringify(newData);
        console.log(jsonString)
        console.log('Ex 1 Button Clicked')
      }
    
    return (
      <>
      <p>List each completed training with a count of how many people have completed that training.</p>
      <p><button className="button" onClick={getTrainingsListWithCounts}>Download JSON file</button></p>
      </>
    )
  }