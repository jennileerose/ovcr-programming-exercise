'use client'
import { Person, PersonStringified } from '../types'
import { reFormatDateStrings, runTrainingInFiscalYear } from '../utilities'

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
      <p>Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
        <p>Trainings = &quot;Electrical Safety for Labs&quot;, &quot;X-Ray Safety&quot;, &quot;Laboratory Safety Training&quot;; Fiscal Year = 2024</p>
        <p><button className="button" onClick={getPeopleWithSpecifiedTrainingPerYear}>Download JSON file</button></p>
      </>
    )
  }