'use client'
import { useState } from 'react'
import { TrainingList, Person } from '../types'
import { runTrainingCountData } from '../utilities';

export default function Exercise1({baseData}:{baseData: Person[]}){
    
    const [trainingList, setTrainingList] = useState<TrainingList[]>([])
    
    function getTrainingsListWithCounts() {
        // use the utilities function runTrainingCountData to get the counts from the data
        // setTrainingList(runTrainingCountData(baseData))
        // transform into JSON and export for download
        // console.log(trainingList)
        console.log('Button Clicked')
      }
    
    return (
      <>
      <p>List each completed training with a count of how many people have completed that training.</p>
      <p><button className="button" onClick={() => {getTrainingsListWithCounts}}>Download JSON file</button></p>
      </>
    )
  }