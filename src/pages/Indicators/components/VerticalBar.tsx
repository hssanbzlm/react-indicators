import React from 'react'
import { Bar } from 'react-chartjs-2'; 
import './VerticalBar.css'

interface VerticalBarProps{
    headTitle:string,
    x_Axis:string[],
    y_Axis:number[]
}

const VerticalBar:React.FC<VerticalBarProps>=({headTitle,x_Axis,y_Axis})=> { 
    
    const data = {
        labels: x_Axis,
        datasets: [
          {  
            label: "",
            data:y_Axis, 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
        
      }; 
    return (
        <>
        <div className='header'>
          <h1 className='title'>{headTitle}</h1>
        </div> 
        <div className="bar">
        <Bar options={{maintainAspectRatio:false}}	 data={data} />
        </div>
      </>
    )
}

export default VerticalBar
