'use client'
// import in each of the exercise sections
import Exercise1 from './exercises/exercise1';
import Exercise2 from './exercises/exercise2';
import Exercise2Custom from './exercises/exercise2Custom';
import Exercise3 from './exercises/exercise3';
import Exercise3Custom from './exercises/exercise3Custom';
import { useEffect, useState } from 'react';
import { Person } from './types';

//Each <Exercise> tag is one of the exercises with directions and the button inside individual tabs
export default function HomeTabs({baseData}:{baseData: Person[]}){

    const [exTab1Shown, setExTab1Shown] = useState<boolean>(true)
    const [exTab2Shown, setExTab2Shown] = useState<boolean>(false)
    const [exTab2CustomShown, setExTab2CustomShown] = useState<boolean>(false)
    const [exTab3Shown, setExTab3Shown] = useState<boolean>(false)
    const [exTab3CustomShown, setExTab3CustomShown] = useState<boolean>(false)
    const [exTab1Class, setExTab1Class] = useState<string>('tablinks active-button')
    const [exTab2Class, setExTab2Class] = useState<string>('tablinks non-active-button')
    const [exTab2CustomClass, setExTab2CustomClass] = useState<string>('tablinks non-active-button')
    const [exTab3Class, setExTab3Class] = useState<string>('tablinks non-active-button')
    const [exTab3CustomClass, setExTab3CustomClass] = useState<string>('tablinks non-active-button')

    /* This function changes the tabs from one exercise to another */
    function changeTab(buttonID: string) {
        switch(buttonID) {
            case 'ex1':
                setExTab1Shown(true)
                setExTab2Shown(false)
                setExTab2CustomShown(false)
                setExTab3Shown(false)
                setExTab3CustomShown(false)
                setExTab1Class('tablinks active-button')
                setExTab2Class('tablinks non-active-button')
                setExTab2CustomClass('tablinks non-active-button')
                setExTab3Class('tablinks non-active-button')
                setExTab3CustomClass('tablinks non-active-button')
                break
            case 'ex2':
                setExTab1Shown(false)
                setExTab2Shown(true)
                setExTab2CustomShown(false)
                setExTab3Shown(false)
                setExTab3CustomShown(false)
                setExTab1Class('tablinks non-active-button')
                setExTab2Class('tablinks active-button')
                setExTab2CustomClass('tablinks non-active-button')
                setExTab3Class('tablinks non-active-button')
                setExTab3CustomClass('tablinks non-active-button')
                break
            case 'ex2c':
                setExTab1Shown(false)
                setExTab2Shown(false)
                setExTab2CustomShown(true)
                setExTab3Shown(false)
                setExTab3CustomShown(false)
                setExTab1Class('tablinks non-active-button')
                setExTab2Class('tablinks non-active-button')
                setExTab2CustomClass('tablinks active-button')
                setExTab3Class('tablinks non-active-button')
                setExTab3CustomClass('tablinks non-active-button')
                break
            case 'ex3':
                setExTab1Shown(false)
                setExTab2Shown(false)
                setExTab2CustomShown(false)
                setExTab3Shown(true)
                setExTab3CustomShown(false)
                setExTab1Class('tablinks non-active-button')
                setExTab2Class('tablinks non-active-button')
                setExTab2CustomClass('tablinks non-active-button')
                setExTab3Class('tablinks active-button')
                setExTab3CustomClass('tablinks non-active-button')
                break
            case 'ex3c':
                setExTab1Shown(false)
                setExTab2Shown(false)
                setExTab2CustomShown(false)
                setExTab3Shown(false)
                setExTab3CustomShown(true)
                setExTab1Class('tablinks non-active-button')
                setExTab2Class('tablinks non-active-button')
                setExTab2CustomClass('tablinks non-active-button')
                setExTab3Class('tablinks non-active-button')
                setExTab3CustomClass('tablinks active-button')
                break
            default:
                setExTab1Shown(true)
                setExTab2Shown(false)
                setExTab2CustomShown(false)
                setExTab3Shown(false)
                setExTab3CustomShown(false)
                setExTab1Class('tablinks active-button')
                setExTab2Class('tablinks non-active-button')
                setExTab2CustomClass('tablinks non-active-button')
                setExTab3Class('tablinks non-active-button')
                setExTab3CustomClass('tablinks non-active-button')
              break
          }
    }
    
return (
    <>
        <div className="tab">
            <button className={exTab1Class} id="ex1" onClick={() => changeTab('ex1')}>Exercise 1</button>
            <button className={exTab2Class} id="ex2" onClick={() => changeTab('ex2')}>Exercise 2 - Defaults</button>
            <button className={exTab2CustomClass} id="ex2c" onClick={() => changeTab('ex2c')}>Exercise 2 - Custom</button>
            <button className={exTab3Class} id="ex3" onClick={() => changeTab('ex3')}>Exercise 3 - Defaults</button>
            <button className={exTab3CustomClass} id="ex3c" onClick={() => changeTab('ex3c')}>Exercise 3 - Custom</button>
        </div>
        {exTab1Shown && 
            <div id="Exercise1" className="tabcontent">
                <Exercise1 baseData={baseData} />
            </div>
        }
        
        {exTab2Shown &&
            <div id="Exercise2" className="tabcontent">
                <Exercise2
                    fiscalYear={2024}
                    baseData={baseData}
                    trainings={["Electrical Safety for Labs", "X-Ray Safety", "Laboratory Safety Training"]}
                />
            </div>
        }
        
        {exTab2CustomShown && 
            <div id="Exercise2Cust" className="tabcontent">
                <Exercise2Custom baseData={baseData} />
            </div>
        }
        
        {exTab3Shown && 
            <div id="Exercise3" className="tabcontent">
                <Exercise3 
                    baseData={baseData}
                    checkDate={'10/01/2023'}
                />
            </div>
        }
        
        {exTab3CustomShown && 
            <div id="Exercise3Cust" className="tabcontent">
                <Exercise3Custom baseData={baseData} />
            </div>
        }
    </>
)
}