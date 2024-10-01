'use client'
import { useState } from 'react'
import { Ex2and3DisplayData, Person, PersonStringified, TableColumn } from '../types'
import { formatEx3DisplayData, reFormatExpiredTrainingPeople, runExpiredTrainingsFilter } from '../utilities'
import {Table} from 'typescript-table'


/**************************************************************************
This file imports the following properties from the page.tsx file:
baseData - The main array of data objects
checkDate - the date specified in the exercise (Oct 1st, 2023) as a mm/dd/yyyy string

When the Process button is clicked, it takes baseData and manipulates it into 
the new array of objects (filteredPersonList) and then it is re-formatted with the
dates put into strings in the mm/dd/yyyy format from the original file (newData)
then the display data is formatted and displayed in a typescript-table and
the download JSON data button appears to download the JSON file
***************************************************************************/

export default function Exercise3({baseData, checkDate}:{baseData: Person[], checkDate: string}){

  const [displayData, setDisplayData] = useState<Ex2and3DisplayData[]>()
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
      disableSort: true,
      disableFilter: true
    },
    {
      label: 'Expiration Date',
      property: 'trainingExpireDate',
      disableSort: false,
      disableFilter: false
    },
    {
      label: 'Expiration Status',
      property: 'trainingExpirationStatus',
      disableSort: false,
      disableFilter: false
    }
  ]

  function getDisplayData() {
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
    setDownloadData(newData)
    setDisplayData(formatEx3DisplayData(newData))
    setShowData(true)
  }

  function setupDownload() {
    if(displayData !== null || displayData !== undefined) {
      // Set up the download after displaying the data
      const jsonString = JSON.stringify(downloadData);
      const blob = new Blob([jsonString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "exercise3.json";
      link.href = url;
      link.click();
    }
  }
  
  return (
    <>
      <p><span className='bold'>Exercise 3</span> - Find all people that have any completed trainings that have already expired, or will expire within one month of the specified date Oct 1st, 2023. For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.</p> 
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