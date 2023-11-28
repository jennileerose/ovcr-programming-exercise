'use client'
import { Person } from '../types'
import { reFormatExpiredTrainingPeople, runExpiredTrainingsFilter } from '../utilities'

/**************************************************************************
This file imports the following properties from the page.tsx file:
baseData - The main array of data objects
checkDate - the date specified in the exercise (Oct 1st, 2023) as a mm/dd/yyyy string

When the button is clicked, it takes baseData and manipulates it into 
the new array of objects (filteredPersonList) and then it is re-formatted with the
dates put into strings in the mm/dd/yyyy format from the original file (newData)
***************************************************************************/

export default function Exercise3({baseData, checkDate}:{baseData: Person[], checkDate: string}){
      
  function getExpiredTrainings() {
    // Split the mm/dd/yyyy string and convert the mm into a number, 
    // adding 1 then make it a date for passing to the filtering function
    const splitDate = checkDate.split('/')
    const newMonth = (parseInt(splitDate[0]) + 1).toString()
    const newDate = newMonth + '/' + splitDate[1] + '/' + splitDate[2]
    const newCheckDateAsDate = new Date(newDate)
    const checkDateAsDate = new Date(checkDate)
    // use the utilities function runExpiredTrainingsFilter to get the people with expired trainings from the data
    const filteredPersonList = runExpiredTrainingsFilter(baseData, newCheckDateAsDate)
    // use reformatting function to reformat Dates into date strings
    const newData = reFormatExpiredTrainingPeople(filteredPersonList, checkDateAsDate)
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
    <p><span className='bold'>Exercise 3</span> - Find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
    <p><button className="button" onClick={getExpiredTrainings}>Download JSON file</button></p>
    </>
  )
}