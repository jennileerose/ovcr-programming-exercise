'use client'
import { Person, PersonStringified } from '../types'
import { reFormatDateStrings, runTrainingInFiscalYear } from '../utilities'

/**************************************************************************
This file imports the following properties from the page.tsx file:
baseData - The main array of data objects
fiscalYear - the year specified in the exercise (in this exercise it was 2024)
trainings - an array of strings each describing the trainings that the user
wants to search for. In this exercise it was the following:

Electrical Safety for Labs
X-Ray Safety
Laboratory Safety Training

When the button is clicked, it takes baseData and manipulates it into 
the new array of objects (newData) and then it is re-formatted with the
dates put into strings in the mm/dd/yyyy format from the original file
***************************************************************************/
export default function Exercise2({
  baseData,
  fiscalYear,
  trainings
}:{
    baseData: Person[],
    fiscalYear: number,
    trainings: string[]
}){
        
    function getPeopleWithSpecifiedTrainingPerYear() {
        // use the utilities function runTrainingInFiscalYear to get the list of trainings and a fiscal year from the data
        const newData = runTrainingInFiscalYear(baseData, fiscalYear, trainings)
        // use reformatting function to reformat Dates into date strings
        const reFormattedDatesData = [] as PersonStringified[]
        newData.forEach((person) => {
          reFormattedDatesData.push({
            name: person.name,
            completions: reFormatDateStrings(person.completions)
          })
        })
        // transform into JSON and export for download
        const jsonString = JSON.stringify(reFormattedDatesData);
        const blob = new Blob([jsonString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "exercise2.json";
        link.href = url;
        link.click();
      }
    
    return (
      <>
      <p><span className='bold'>Exercise 2</span> - Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
        <p>Trainings = &quot;Electrical Safety for Labs&quot;, &quot;X-Ray Safety&quot;, &quot;Laboratory Safety Training&quot;; Fiscal Year = 2024</p>
        <p><button className="button" onClick={getPeopleWithSpecifiedTrainingPerYear}>Download JSON file</button></p>
      </>
    )
  }