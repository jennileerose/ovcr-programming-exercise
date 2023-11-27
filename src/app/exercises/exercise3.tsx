'use client'
import { Person } from '../types'
import { reFormatExpiredTrainingPeople, runExpiredTrainingsFilter } from '../utilities'

export default function Exercise3({baseData, checkDate}:{baseData: Person[], checkDate: string}){
      
    function getExpiredTrainings() {
        // use the utilities function runExpiredTrainingsFilter to get the people with expired trainings from the data
        const checkDateAsDate = new Date(checkDate)
        const filteredPersonList = runExpiredTrainingsFilter(baseData, checkDateAsDate)
        const newData = reFormatExpiredTrainingPeople(filteredPersonList, checkDateAsDate)
        console.log(newData)
        // transform into JSON and export for download
        console.log('Ex 3 Button Clicked')
        // const jsonString = JSON.stringify(newData);
        // const blob = new Blob([jsonString], { type: "text/plain" });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.download = "exercise1.json";
        // link.href = url;
        // link.click();
      }
    
    return (
      <>
      <p>Given a date, find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
      <p><button className="button" onClick={getExpiredTrainings}>Download JSON file</button></p>
      </>
    )
  }