'use client'
import { useEffect, useState } from 'react'
import { Person } from '../types'
import { reFormatExpiredTrainingPeople, runExpiredTrainingsFilter } from '../utilities'

/**************************************************************************
This file imports the following properties from the page.tsx file:
baseData - The main array of data objects

When a date is selected in the calendar input and the button is clicked, it takes 
baseData and manipulates it into the new array of objects (filteredPersonList) 
and then it is re-formatted with the dates put into strings in the mm/dd/yyyy 
format from the original file (newData)
***************************************************************************/

export default function Exercise3Custom({baseData}:{baseData: Person[]}){

  const [selectedExpDate, setSelectedExpDate] = useState<string>('2023-10-01')
  const [today, setToday] = useState<string>('')

  useEffect(() => {
    // grabs today's date and makes it the calendar max
    const now = Date.now();
    const todaysDate = new Date(now)
    let month = todaysDate.getMonth() + 1
    let day = todaysDate.getDate()
    let year = todaysDate.getFullYear()
    let dayString = ''
    // need to add a zero to the day if the date is less than 10
    if(day < 10) {
      dayString = '0' + day.toString()
    } else {
      dayString = day.toString()
    }
    const todayDateString = year.toString() + '-' + month.toString() + '-' + dayString
    console.log(todayDateString)
    setToday(todayDateString)
  })
      
  function getExpiredTrainings() {
    // Split the yyyy-mm-dd string from the input box and convert it to mm/dd/yyyy format, 
    const splitDate = selectedExpDate.split('-')
    const newMonth = (parseInt(splitDate[0]) + 1).toString()
    const newDate = newMonth + '/' + splitDate[2] + '/' + splitDate[0]
    const newDateAsDate = splitDate[1] + '/' + splitDate[2] + '/' + splitDate[0]
    const newCheckDateAsDate = new Date(newDate)
    const checkDateAsDate = new Date(newDateAsDate)
    // use the utilities function runExpiredTrainingsFilter to get the people with expired trainings from the data
    const filteredPersonList = runExpiredTrainingsFilter(baseData, newCheckDateAsDate)
    // use reformatting function to reformat Dates into date strings
    const newData = reFormatExpiredTrainingPeople(filteredPersonList, checkDateAsDate)
    // transform into JSON and export for download
    const jsonString = JSON.stringify(newData);
    const blob = new Blob([jsonString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "exercise3Custom.json";
    link.href = url;
    link.click();
  }
  
  return (
    <>
    <p><span className='bold'>Exercise 3</span> - Find all people that have any completed trainings that have already expired, or will expire within one month of the selected date. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 

    <label htmlFor="expDate">Expiration date:</label>

    <input type="date" id="expDate" name="exp-date" min="01/01/2022" max={today} onChange={(e) => setSelectedExpDate(e.target.value)}/>

    <p><button className="button" onClick={getExpiredTrainings}>Download JSON file</button></p>
    </>
  )
}