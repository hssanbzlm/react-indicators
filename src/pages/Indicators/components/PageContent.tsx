import axios from "axios";
import React, { useEffect, useState } from "react";
import { Data, Ranges } from "../../../helpers/Interfaces";
import BarGraphContent from "./BarGraphContent";
import PieGraphContent from "./PieGraphContent";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Alert } from 'antd';
import END_POINTS from '../../../api-config/end-points'


interface PageContentProps{
  range:[Ranges]
}

const PageContent: React.FC<PageContentProps> = ({range}) => {  
  // @ts-ignore  
  //Here I disabled tslint cause even when I added ? to startDate?.getMonth()+1 , ts complained about possible undefined value
  let formattedStartingDate=`${range[0].startDate?.getDate()}/${range[0].startDate?.getMonth()+1}/${range[0].startDate?.getFullYear()}`; 
    // @ts-ignore  
  let formattedEndingDate=`${range[0].endDate?.getDate()}/${range[0].endDate?.getMonth()+1}/${range[0].endDate?.getFullYear()}`; 

  const [data,setData]=useState<Data[]>([]);
  const [isLoading,setLoading]=useState(false);
  const[isError,setError]=useState(false);
  useEffect(() => {
    setLoading(true)
    setError(false);
    axios.get(END_POINTS.data_end_point).then((response)=>{ 
        const data:Data[]=response.data;
        setData(data);
        setLoading(false);
    }).catch((err)=>{
      setLoading(false);
      setError(true)
    })
  }, [])

  return (  
    isError?<><Alert message="Error while requesting data" type="error" /></>:
    isLoading? <>  
    <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </>: 
    <> 
     <BarGraphContent data={data} startingDate={formattedStartingDate} endingDate={formattedEndingDate}/>
     <PieGraphContent data={data} startingDate={formattedStartingDate} endingDate={formattedEndingDate} />
    </>

  );
};

export default PageContent;
