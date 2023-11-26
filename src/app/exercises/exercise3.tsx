'use client'
import { useState } from 'react'
import { Person } from '../types'
// import { runTrainingCountData } from '../utilities';

export default function Exercise3({baseData}:{baseData: Person[]}){
    
    // const [trainingList, setTrainingList] = useState<TrainingList[]>([])
    
    function getExpiredTrainings() {
        // use the utilities function [] to get the [] from the data
        // transform into JSON and export for download
        console.log('Ex 3 Button Clicked')
      }
    
    return (
      <>
      <p>Given a date, find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
      <p><button className="button" onClick={getExpiredTrainings}>Download JSON file</button></p>
      </>
    )
  }