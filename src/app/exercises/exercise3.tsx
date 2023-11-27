'use client'
import { Person } from '../types'
import { reFormatExpiredTrainingPeople, runExpiredTrainingsFilter } from '../utilities'

export default function Exercise3({baseData, checkDate}:{baseData: Person[], checkDate: string}){
      
    function getExpiredTrainings() {
        // use the utilities function runExpiredTrainingsFilter to get the people with expired trainings from the data
        const splitDate = checkDate.split('/')
        const newMonth = (parseInt(splitDate[0]) + 1).toString()
        const newDate = newMonth + '/' + splitDate[1] + '/' + splitDate[2]
        const newCheckDateAsDate = new Date(newDate)
        const checkDateAsDate = new Date(checkDate)
        const filteredPersonList = runExpiredTrainingsFilter(baseData, newCheckDateAsDate)
        const newData = reFormatExpiredTrainingPeople(filteredPersonList, checkDateAsDate, newCheckDateAsDate)
        console.log(newData)
        // transform into JSON and export for download
        const jsonString = JSON.stringify(newData);
        const blob = new Blob([jsonString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "exercise3.json";
        link.href = url;
        link.click();
      }
    
    return (
      <>
      <p>Given a date, find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
      <p><button className="button" onClick={getExpiredTrainings}>Download JSON file</button></p>
      </>
    )
  }