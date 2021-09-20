import { render,fireEvent,cleanup } from "@testing-library/react";
import DropDown from "../pages/Indicators/components/DropDown";
import React from 'react'
const data: string[] = [
  "Mecânico",
  "Soldador",
  "Montador",
  "Eletricista",
  "Engenheiro",
  "Analista de Segurança",
  "Analista de Sistemas",
];
const callBackFunction=jest.fn(); 

afterEach(()=>cleanup)
afterEach(()=>jest.resetAllMocks());
describe("DropDown component test", () => {   

  test('DropDown options must render',async()=>{

    const dropDown = render(<DropDown options={data} label={"Professions"} selectedOption={data[0]} change={callBackFunction}/>); 
    const options=await dropDown.findByTestId('use-dropdown-professions');
    expect(options).toBeTruthy();

  }) 

  test('should call on change function ',async ()=>{  

    const dropDown = render(<DropDown options={data} label={"Professions"} selectedOption={data[0]} change={callBackFunction}/>); 
    const selectElement=await dropDown.findByTestId('use-dropdown-professions');   
    fireEvent.change(selectElement);
    expect(callBackFunction).toHaveBeenCalled();
  })

  test('should display all options',async ()=>{

    const dropDown = render(<DropDown options={data} label={"Professions"} selectedOption={data[0]} change={callBackFunction}/>); 
    const selectElement=await dropDown.findByTestId('use-dropdown-professions');
    const allOptions=selectElement.querySelectorAll('option');
    expect(allOptions).toHaveLength(data.length);
    for(let i=1;i<data.length;i++)
    expect(allOptions[i].textContent).toEqual(data[i]);


  })

  test('should be disabled',async()=>{
    const data:string[]=[];
    const dropDown = render(<DropDown options={[]} label={"Professions"} selectedOption={data[0]} change={callBackFunction}/>); 
    const selectElement=await dropDown.findByTestId('use-dropdown-professions');
    expect(selectElement.hasAttribute('disabled')).toEqual(true);
   
  })

});
