import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { getDataForSpecificArea, getGraphData } from '../../../helpers/helper'; 
import useDropdown from "./useDropdown"; 
import VerticalBar from './VerticalBar';
import { Area, Data, GraphData } from '../../../helpers/Interfaces';
import './BarGraphContent.css'
import { Alert } from 'antd';


interface columnProps{ 
    data:Data[],
    startingDate:string,
    endingDate:string
}
const BarGraphContent:React.FC<columnProps>=({data,startingDate,endingDate})=> { 
    const [graphData,setGraphData]=useState<GraphData[]>([]);
    const [areas,setAreas]=useState<string[]>([]); 
    const [selectedArea,AreasDropdown,setArea]=useDropdown("Areas","",areas);
    const[isError,setError]=useState(false);

    useEffect(() => {  
        let isSubscribed = true
         setError(false);
        axios.get(' http://localhost:3001/Areas').then((ar)=>{  
            if(isSubscribed){
                const AREAS=ar.data.map((area:Area)=>area.AreaName);
                setAreas(AREAS);
                setArea(AREAS[0]);//default selected area
          
            }
        }).catch((err)=>setError(true)) 

        return ()=>{isSubscribed=false}
    },[setArea])

    useEffect(() => {  
        const dataForSpecificArea=getDataForSpecificArea(startingDate,endingDate,selectedArea,data);  
        const getGd=getGraphData(dataForSpecificArea); 
        setGraphData(getGd);
    }, [startingDate,endingDate,selectedArea,data])

    
    return ( 
        isError?<Alert message="Error while requesting areas list" type="error" />:
        <div className="bargraph-container" > 
        <div className="drop-down-container">
            <AreasDropdown/> 
        </div>   
        <div className="bar-container" >

            { graphData.length>0?

             <VerticalBar 
              headTitle={`Working hours for each collaborator in ${selectedArea} between ${startingDate} and ${endingDate}`}
              y_Axis={graphData.map((v)=>v.Working_Hours)} 
              x_Axis={graphData.map((v)=>v.Colaborator)} 
              />
             : 
             <Alert message="No data found, try another dates/filter" type="info" />

            }
        </div>

        </div>
    )
}

export default BarGraphContent
