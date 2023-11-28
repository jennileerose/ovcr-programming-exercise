'use client'
import { Person } from '../types'
import { runTrainingCountData } from '../utilities';

/**************************************************************************
This file imports that main data array (baseData) from the page.tsx file 
When the button is clicked, it takes baseData and manipulates it into 
the new array of objects (newData)
***************************************************************************/
export default function Exercise1({baseData}:{baseData: Person[]}){
    function getTrainingsListWithCounts() {
        // use the utilities function runTrainingCountData to get the counts from the data
        const newData = runTrainingCountData(baseData)
        // transform into JSON and export for download
        const jsonString = JSON.stringify(newData);
        const blob = new Blob([jsonString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "exercise1.json";
        link.href = url;
        link.click();
      }
    
    return (
      <>
      <p><span className='bold'>Exercise 1</span> - List each completed training with a count of how many people have completed that training.</p>
      <p><button className="button" onClick={getTrainingsListWithCounts}>Download JSON file</button></p>
      </>
    )
  }