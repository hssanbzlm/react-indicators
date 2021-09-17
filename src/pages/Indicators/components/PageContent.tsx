import axios from "axios";
import React, { useEffect, useState } from "react";
import { Data } from "../../../helpers/Interfaces";
import { Ranges } from "../Indicators";
import BarGraphContent from "./BarGraphContent";
import PieGraphContent from "./PieGraphContent";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface columnProps{
  range:[Ranges]
}

const PageContent: React.FC<columnProps> = ({range}) => {  
  // @ts-ignore  
  //Here I disabled tslint cause even when I added ? to startDate?.getMonth()+1 , ts complained about possible undefined value
  let formattedStartingDate=`${range[0].startDate?.getDate()}/${range[0].startDate?.getMonth()+1}/${range[0].startDate?.getFullYear()}`; 
    // @ts-ignore  
  let formattedEndingDate=`${range[0].endDate?.getDate()}/${range[0].endDate?.getMonth()+1}/${range[0].endDate?.getFullYear()}`; 

  const [data,setData]=useState<Data[]>([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3001/Data').then((response)=>{ 
        const data:Data[]=response.data;
        setData(data);
        setLoading(false);
    })
  }, [])

  return ( 
    loading? <>  
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
