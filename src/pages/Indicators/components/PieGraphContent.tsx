import axios from 'axios';
import React,{useEffect, useState} from 'react' 
import { getDataForSpecificProfession, getPieData } from '../../../helpers/helper';
import { Data, PieData, Professions } from '../../../helpers/Interfaces';
import PieChart from './PieChart';
import useDropdown from './useDropdown';
import './PieGraphContent.css'
import { Alert } from 'antd';
import END_POINTS from '../../../api-config/end-points';


interface columnProps{
    data:Data[],
    startingDate:string,
    endingDate:string
}

const PieGraphContent:React.FC<columnProps>= ({data,startingDate,endingDate})=> {  
    const [pieData,setPieData]=useState<PieData[]>([]);
    const [professions,setProfessions]=useState<string[]>([]);  
    const [selectedProfession,ProfessionsDropdown,setProfession]=useDropdown("Professions","",professions)
    const [isError,setError]=useState(false);

    useEffect(() => {  
        let isSubscribed = true;
        setError(false);
        axios.get(END_POINTS.professions_end_point).then((pro)=>{  
            if(isSubscribed){
                const PROFESSIONS=pro.data.map((area:Professions)=>area.ProfessionName);
                 setProfessions(PROFESSIONS);
                 setProfession(PROFESSIONS[0]);//default selected area
            }
        }).catch((err)=>setError(true)) 
        return ()=>{isSubscribed=false;}
    },[setProfession])

    useEffect(() => { 
        const dataForSpecificProfessions=getDataForSpecificProfession(startingDate,endingDate,selectedProfession,data);
        const getPd=getPieData(dataForSpecificProfessions); 
        setPieData(getPd);
    },[startingDate,endingDate,selectedProfession,data])


    return ( 
        isError?<Alert message="Error while requesting professions list" type="error" />:

        <div className="piegraph-container" > 
            <div className="drop-down-container" >
            <ProfessionsDropdown/> 
            </div>  
            <div className="pie-container" >
            { pieData.length>0?
             
                 <PieChart 
                 pieData={pieData.map((v)=>v.Working_Hours)} 
                 labels={pieData.map((v)=>v.Area)} 
                 headTitle={`Working hours in different areas for ${selectedProfession} between ${startingDate} and ${endingDate}`} />
                 :<Alert message="No data found, try another dates/filter" type="info" />
            
            }

            </div>
            
        </div> 
    )
}

export default PieGraphContent
