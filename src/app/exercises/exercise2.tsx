'use client'
import { useState } from 'react'
import { Person, PersonStringified, TableColumn } from '../types'
import { formatEx2DisplayData, reFormatDateStrings, runTrainingInFiscalYear } from '../utilities'
import { Table } from 'typescript-table'

/**************************************************************************
This file imports the following properties from the page.tsx file:
baseData - The main array of data objects
fiscalYear - the year specified in the exercise (in this exercise it was 2024)
trainings - an array of strings each describing the trainings that the user
wants to search for. In this exercise it was the following:

Electrical Safety for Labs
X-Ray Safety
Laboratory Safety Training

When the process button is clicked, it takes baseData and manipulates it into 
the new array of objects (newData) and then it is re-formatted with the
dates put into strings in the mm/dd/yyyy format from the original file and then
it's processed for the display table and then the download button under the table
triggers the download for the JSON file.
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
  const [displayData, setDisplayData] = useState<any[]>()
  const [downloadData, setDownloadData] = useState<PersonStringified[]>()
  const [showData, setShowData] = useState<boolean>(false)

  const displayColumns: TableColumn[] = [
    {
      label: 'Name',
      property: 'name',
      disableSort: false,
      disableFilter: false
    },
    {
      label: 'Training Name',
      property: 'trainingName',
      disableSort: false,
      disableFilter: false
    },
    {
      label: 'Training Timestamp',
      property: 'trainingTimestamp',
      disableSort: false,
      disableFilter: false
    },
    {
      label: 'Expiration Date',
      property: 'trainingExpireDate',
      disableSort: false,
      disableFilter: false
    }
  ]

    function getDisplayData() {
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
      setDownloadData(reFormattedDatesData)
      setDisplayData(formatEx2DisplayData(reFormattedDatesData))
      setShowData(true)
    }
    
    function setupDownload() {
      if(displayData !== null || displayData !== undefined) {
        // Set up the download after displaying the data
        const jsonString = JSON.stringify(downloadData);
        const blob = new Blob([jsonString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "exercise2.json";
        link.href = url;
        link.click();
      }
    }
    return (
      <>
        <p><span className='bold'>Exercise 2</span> - Given a list of trainings and a fiscal year for each specified training, list all people that completed that training in the specified fiscal year</p>
        <p>Trainings = &quot;Electrical Safety for Labs&quot;, &quot;X-Ray Safety&quot;, &quot;Laboratory Safety Training&quot;; Fiscal Year = 2024</p>
        <p><button className="button" onClick={getDisplayData}>Process and Show Data</button></p>
        {showData && displayData && downloadData &&
          <>
            <div>
              <Table 
                data={displayData}
                columns={displayColumns}
              />
            </div>
            <p><button className="button" onClick={setupDownload}>Download JSON file</button></p>
          </>
        }
      </>
    )
  }