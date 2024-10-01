'use client'
import { useEffect, useState } from 'react';
import { Person, PersonStringified, TrainingListOptions } from '../types'
import { getTrainingsList, reFormatDateStrings, runTrainingInFiscalYear } from '../utilities'
import { MultiSelect } from 'react-multi-select-component';

/**************************************************************************
This file imports the following properties from the homeTabs.tsx file:
baseData - The main array of data objects.

When trainings are picked from the multi-select dropdown and a fiscal year
is selected from the single dropdown below it, those properties are saved.

When the button is clicked, it takes baseData and those settings and 
manipulates it into the new array of objects (newData) and then it is 
re-formatted with the dates put into strings in the mm/dd/yyyy format from 
the original file.
***************************************************************************/
export default function Exercise2Custom({baseData}:{baseData: Person[]}){
  
    const [selectedTrainings, setSelectedTrainings] = useState<TrainingListOptions[]>([])
    const [options, setOptions] = useState<TrainingListOptions[]>([])
    const [selectedFiscalYear, setSelectedFiscalYear] = useState<number>(2022)

    useEffect(() => {
      const trainings = getTrainingsList(baseData)
      const tempOptions = [] as TrainingListOptions[]
      trainings.forEach((training) => {
        tempOptions.push({
          label: training,
          value: training
        })
      })
      setOptions(tempOptions)
    }, [setOptions]);
          
    function getPeopleWithSpecifiedTrainingPerYear() {
      if(selectedTrainings.length !== 0) {
        const trainings = [] as string[] 
        selectedTrainings.forEach((selected) => {
          trainings.push(selected.value)
        })
        // use the utilities function runTrainingInFiscalYear to get the list of trainings and a fiscal year from the data
        const newData = runTrainingInFiscalYear(baseData, selectedFiscalYear, trainings)
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
        link.download = "exercise2Custom.json";
        link.href = url;
        link.click();
      } else {
        alert('No trainings selected')
      }
    }
    
    return (
      <>
        <p><span className='bold'>Exercise 2 - Custom</span> - Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
        <p>Select Trainings and Fiscal Year from the form then click the download button.</p>
        <label>Trainings</label>
          <MultiSelect
            options={options}
            value={selectedTrainings}
            onChange={setSelectedTrainings}
            labelledBy="Select Trainings"
          />
        <br />
        <label>Fiscal Year</label>
        <br />
        <select onChange={(e) => setSelectedFiscalYear(parseInt(e.target.value))}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <p><button className="button" onClick={getPeopleWithSpecifiedTrainingPerYear}>Download JSON file</button></p>
      </>
    )
  }