import axios from 'axios';
import React,{useEffect, useState} from 'react' 
import { getDataForSpecificProfession, getPieData } from '../../../helpers/helper';
import { Data, PieData, Professions } from '../../../helpers/Interfaces';
import PieChart from './PieChart';
import useDropdown from './useDropdown';
import './PieGraphContent.css'

interface columnProps{
    data:Data[],
    startingDate:string,
    endingDate:string
}

const PieGraphContent:React.FC<columnProps>= ({data,startingDate,endingDate})=> {  
    const [pieData,setPieData]=useState<PieData[]>([]);
    const [professions,setProfessions]=useState<string[]>([]);  
    const [selectedProfession,ProfessionsDropdown,setProfession]=useDropdown("Professions","",professions)


    useEffect(() => {  
        let isSubscribed = true
        axios.get(' http://localhost:3001/Professions').then((pro)=>{  
            if(isSubscribed){
                const PROFESSIONS=pro.data.map((area:Professions)=>area.ProfessionName);
                 setProfessions(PROFESSIONS);
                 setProfession(PROFESSIONS[0]);//default selected area
            }
        }).catch((err)=>console.log(err)) 
        return ()=>{isSubscribed=false;}
    },[setProfession])

    useEffect(() => { 

        const dataForSpecificProfessions=getDataForSpecificProfession(startingDate,endingDate,selectedProfession,data);
        console.log(dataForSpecificProfessions);
        const getPd=getPieData(dataForSpecificProfessions); 
        console.log(getPd);
        setPieData(getPd);
       
    },[startingDate,endingDate,selectedProfession,data])


    return (
        <div className="piegraph-container" > 
            <div className="drop-down-container" >
            <ProfessionsDropdown/> 
            </div>  
            <div className="pie-container" >
            { pieData.length>0?
             
                 <PieChart pieData={pieData.map((v)=>v.Working_Hours)} labels={pieData.map((v)=>v.Area)} headTitle={`Working hours in different areas for ${selectedProfession} between ${startingDate} and ${endingDate}`} />:"not found"
            
            }

            </div>
            
        </div> 
    )
}

export default PieGraphContent
