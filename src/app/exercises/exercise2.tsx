'use client'
import { useState } from 'react'
import { Person } from '../types'
// import { runTrainingCountData } from '../utilities';

export default function Exercise2({baseData}:{baseData: Person[]}){
    
    // const [trainingList, setTrainingList] = useState<TrainingList[]>([])
    
    function getPeopleWithSpecifiedTrainingPerYear() {
        // use the utilities function [] to get the [] from the data
        // transform into JSON and export for download
        console.log('Ex 2 Button Clicked')
      }
    
    return (
      <>
      <p>Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
        <p>Trainings = &quot;Electrical Safety for Labs&quot;, &quot;X-Ray Safety&quot;, &quot;Laboratory Safety Training&quot;; Fiscal Year = 2024</p>
        <p><button className="button" onClick={getPeopleWithSpecifiedTrainingPerYear}>Download JSON file</button></p>
      </>
    )
  }