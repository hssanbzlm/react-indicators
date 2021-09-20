import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { getDataForSpecificArea, getGraphData } from '../../../helpers/helper'; 
import VerticalBar from './VerticalBar';
import { Area, Data, GraphData } from '../../../helpers/Interfaces';
import './BarGraphContent.css'
import { Alert } from 'antd';
import END_POINTS from '../../../api-config/end-points'
import DropDown from './DropDown';


interface BarGraphContentProps{ 
    data:Data[],
    startingDate:string,
    endingDate:string
}
const BarGraphContent:React.FC<BarGraphContentProps>=({data,startingDate,endingDate})=> { 
    const [graphData,setGraphData]=useState<GraphData[]>([]);
    const [areas,setAreas]=useState<string[]>([]); 
    const [selectedArea,setSelectedArea]=useState("");
    const[isError,setError]=useState(false); 

    useEffect(() => {  
        let isSubscribed = true
        setError(false);
        axios.get(END_POINTS.areas_end_point).then((ar)=>{  
            if(isSubscribed){
                const AREAS=ar.data.map((area:Area)=>area.AreaName);
                setAreas(AREAS);      
                setSelectedArea(AREAS[0])    
            }
        }).catch((err)=>setError(true)) 

        return ()=>{isSubscribed=false}
    },[])

    useEffect(() => {  
        const dataForSpecificArea=getDataForSpecificArea(startingDate,endingDate,selectedArea,data);
        const getGd=getGraphData(dataForSpecificArea); 
        setGraphData(getGd);
    }, [startingDate,endingDate,selectedArea,data])

    
    return ( 
        isError?<Alert data-testid="error" message="Error while requesting areas list" type="error" />:
        <div data-testid="bargraph" className="bargraph-container" > 
        <div className="drop-down-container">
            <DropDown label="Areas" selectedOption={selectedArea} options={areas} change={setSelectedArea}/> 
        </div>   
        <div className="bar-container" >

            { graphData.length>0?

             <VerticalBar 
              headTitle={`Working hours for each collaborator in ${selectedArea} between ${startingDate} and ${endingDate}`}
              y_Axis={graphData.map((v)=>v.Working_Hours)} 
              x_Axis={graphData.map((v)=>v.Colaborator)} 
              />
             : 
             <Alert data-testid="info" message="No data found, try another dates/filter" type="info" />

            }
        </div>

        </div>
    )
}

export default BarGraphContent
