'use client'
import { changeTab } from './utilities';
// import in each of the exercise sections
import Exercise1 from './exercises/exercise1';
import Exercise2 from './exercises/exercise2';
import Exercise3 from './exercises/exercise3';
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
            <button className="tablinks" id="ex2" onClick={() => changeTab('Exercise2', 'ex2')}>Exercise 2</button>
            <button className="tablinks" id="ex3" onClick={() => changeTab('Exercise3', 'ex3')}>Exercise 3</button>
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

        <div id="Exercise3" className="tabcontent">
            <Exercise3 
                baseData={baseData}
                checkDate={'10/01/2023'}
            />
        </div>
    </>
)
}