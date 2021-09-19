import axios from 'axios';
import React,{useEffect, useState} from 'react' 
import { getDataForSpecificProfession, getPieData } from '../../../helpers/helper';
import { Data, PieData, Professions } from '../../../helpers/Interfaces';
import PieChart from './PieChart';
import './PieGraphContent.css'
import { Alert } from 'antd';
import END_POINTS from '../../../api-config/end-points';
import DropDown from './DropDown';


interface columnProps{
    data:Data[],
    startingDate:string,
    endingDate:string
}

const PieGraphContent:React.FC<columnProps>= ({data,startingDate,endingDate})=> {  
    const [pieData,setPieData]=useState<PieData[]>([]);
    const [professions,setProfessions]=useState<string[]>([]);
    const [selectedProfession,setSelectedProfession]=useState(professions[0]);  
    const [isError,setError]=useState(false);

    useEffect(() => {  
        let isSubscribed = true;
        setError(false);
        axios.get(END_POINTS.professions_end_point).then((pro)=>{  
            if(isSubscribed){
                const PROFESSIONS=pro.data.map((area:Professions)=>area.ProfessionName);
                 setProfessions(PROFESSIONS);
            }
        }).catch((err)=>setError(true)) 
        return ()=>{isSubscribed=false;}
    },[])

    useEffect(() => { 
        const dataForSpecificProfessions=getDataForSpecificProfession(startingDate,endingDate,selectedProfession,data);
        const getPd=getPieData(dataForSpecificProfessions); 
        setPieData(getPd);
    },[startingDate,endingDate,selectedProfession,data])


    return ( 
        isError?<Alert message="Error while requesting professions list" type="error" />:

        <div className="piegraph-container" > 
            <div className="drop-down-container" >
            <DropDown label="Professions" selectedOption={selectedProfession} options={professions} change={setSelectedProfession}/> 

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
