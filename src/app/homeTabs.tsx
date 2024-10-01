'use client'
import { changeTab } from './utilities';
// import in each of the exercise sections
import Exercise1 from './exercises/exercise1';
import Exercise2 from './exercises/exercise2';
import Exercise2Custom from './exercises/exercise2Custom';
import Exercise3 from './exercises/exercise3';
import Exercise3Custom from './exercises/exercise3Custom';
import { useEffect } from 'react';
import { Person } from './types';

//Each <Exercise> tag is one of the exercises with directions and the button inside individual tabs
export default function HomeTabs({baseData}:{baseData: Person[]}){
    useEffect(() => {
        const defaultTab = document.getElementById("ex1")
        if(defaultTab !== null) {
            defaultTab.click()
        }
      });
    
return (
    <>
        <div className="tab">
            <button className="tablinks active" id="ex1" onClick={() => changeTab( 'Exercise1', 'ex1')}>Exercise 1</button>
            <button className="tablinks" id="ex2" onClick={() => changeTab('Exercise2', 'ex2')}>Exercise 2 - Defaults</button>
            <button className="tablinks" id="ex2c" onClick={() => changeTab('Exercise2Cust', 'ex2c')}>Exercise 2 - Custom</button>
            <button className="tablinks" id="ex3" onClick={() => changeTab('Exercise3', 'ex3')}>Exercise 3 - Defaults</button>
            <button className="tablinks" id="ex3c" onClick={() => changeTab('Exercise3Cust', 'ex3c')}>Exercise 3 - Custom</button>
        </div>

        <div id="Exercise1" className="tabcontent">
            <Exercise1 baseData={baseData} />
        </div>

        <div id="Exercise2" className="tabcontent">
            <Exercise2
                fiscalYear={2024}
                baseData={baseData}
                trainings={["Electrical Safety for Labs", "X-Ray Safety", "Laboratory Safety Training"]}
            />
        </div>

        <div id="Exercise2Cust" className="tabcontent">
            <Exercise2Custom baseData={baseData} />
        </div>

        <div id="Exercise3" className="tabcontent">
            <Exercise3 
                baseData={baseData}
                checkDate={'10/01/2023'}
            />
        </div>

        <div id="Exercise3Cust" className="tabcontent">
        <Exercise3Custom baseData={baseData} />
        </div>
    </>
)
}