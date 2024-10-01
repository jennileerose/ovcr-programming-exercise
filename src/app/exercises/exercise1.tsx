'use client'
import { useState } from 'react';
import { Person } from '../types'
import { TableColumn, TrainingList } from '../types'
import { runTrainingCountData } from '../utilities';
import { Table } from 'typescript-table';

/**************************************************************************
This file imports that main data array (baseData) from the page.tsx file 
When the process button is clicked, it takes baseData and manipulates it into 
the new array of objects (newData) which is displayed in a table. 
The download button under the display is for downloading the JSON file of the data
***************************************************************************/
export default function Exercise1({baseData}:{baseData: Person[]}){

  const [displayData, setDisplayData] = useState<TrainingList[]>()
  const [downloadData, setDownloadData] = useState<TrainingList[]>()
  const [showData, setShowData] = useState<boolean>(false)

  const displayColumns: TableColumn[] = [
    {
      label: 'Training Name',
      property: 'name',
      disableSort: false,
      disableFilter: false
    },
    {
      label: 'Number of Completions',
      property: 'count',
      disableSort: false,
      disableFilter: false
    }
  ]

  function getDisplayData() {
    // use the utilities function runTrainingCountData to get the counts from the data
    const newData = runTrainingCountData(baseData)
    setDownloadData(newData)
    setDisplayData(newData)
    setShowData(true)
  }

  function setupDownload() {
    if(displayData !== null || displayData !== undefined) {
      // transform into JSON and export for download
      const jsonString = JSON.stringify(downloadData);
      const blob = new Blob([jsonString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "exercise1.json";
      link.href = url;
      link.click();
    }
  }

    return (
      <>
        <p><span className='bold'>Exercise 1</span> - List each completed training with a count of how many people have completed that training.</p>
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