import { cleanup, render } from "@testing-library/react";
import React from 'react';
import { Data } from "../helpers/Interfaces";
import BarGraphContent from "../pages/Indicators/components/BarGraphContent"; 
import axios from 'axios'

afterEach(()=>cleanup)
afterEach(()=>jest.resetAllMocks());
const data:Data[]=[
    {Colaborator:"Hssan",Working_Hours:"from 08:00 to 14:00",Areas:"Galpão Primário",Date:"01/09/2021",Professions:"Mecânico"},
    {Colaborator:"Tom",Working_Hours:"from 08:00 to 15:00",Areas:"Ala de Montagem",Date:"15/09/2021",Professions:"Soldador"},
    {Colaborator:"Jack",Working_Hours:"from 12:00 to 14:00",Areas:"Galpão Primário",Date:"05/09/2021",Professions:"Engenheiro"},
    {Colaborator:"Alonso",Working_Hours:"from 16:00 to 18:00",Areas:"Sala de Administração",Date:"08/09/2021",Professions:"Montador"},
    {Colaborator:"Maria",Working_Hours:"from 09:30 to 17:00",Areas:"Sala de Administração",Date:"01/09/2021",Professions:"Eletricista"},
    {Colaborator:"Danilo",Working_Hours:"from 9:00 to 11:00",Areas:"Pátio de Manutenção",Date:"08/09/2021",Professions:"Mecânico"},
    {Colaborator:"Roberto",Working_Hours:"from 11:30 to 15:00",Areas:"Galpão Secundário",Date:"01/09/2021",Professions:"Montador"},

]

const AreasData=[{AreaName:"Galpão Primário"},{AreaName:"Sala de Administração"},{AreaName:"Pátio de Manutenção"}];
 jest.mock('axios');

describe('Test BarGraphContent component',()=>{


test('should display bargraph content ',async()=>{
     (axios.get as jest.Mock).mockImplementation(()=>Promise.resolve({data:AreasData}))
    const BarGraphContentComponent=render(<BarGraphContent data={data} startingDate={'20/09/2021'} endingDate={'25/09/2021'} />)
    const graphContainer=await BarGraphContentComponent.findByTestId('bargraph');
    expect(graphContainer).toBeTruthy();
    expect(graphContainer.getElementsByClassName("drop-down-container")[0]).toBeTruthy();
    expect(graphContainer.getElementsByClassName("bar-container")[0]).toBeTruthy();
    expect(graphContainer.getElementsByClassName("drop-down-container")[0].querySelectorAll('option').length).toEqual(3)

}) 

test('should display error',async ()=>{ 

    (axios.get as jest.Mock).mockImplementation(()=>Promise.reject({error:"error"}))
    const BarGraphContentComponent=render(<BarGraphContent data={data} startingDate={'01/09/2021'} endingDate={'05/09/2021'} />)
    const errorContainer=await BarGraphContentComponent.findByTestId('error');
    expect(errorContainer).toBeTruthy();



})

test('should display info message',async ()=>{

    (axios.get as jest.Mock).mockImplementation(()=>Promise.resolve({data:AreasData}))
    const BarGraphContentComponent=render(<BarGraphContent data={data} startingDate={'20/09/2021'} endingDate={'21/09/2021'} />)
    const infoContainer=await BarGraphContentComponent.findByTestId('info');
    expect(infoContainer).toBeTruthy();

})


})