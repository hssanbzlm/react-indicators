import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col } from "antd";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import './PageHeader.css';
import { Ranges } from '../../../helpers/Interfaces';
interface columnProps{
  change:Dispatch<SetStateAction<[Ranges]>>;
  value:[Ranges];
}


const PageHeader: React.FC<columnProps> = ({change,value}) => {   
  
  return (
    <Row>
      <Col span={24}>
        <div className="page-title"> 
        
           <h1> CHARTS</h1>
        </div> 
        <div className="header-calendar" >  
        <DateRange
        onChange={item => change([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={value}
        direction="horizontal" 
        />
            
        </div>
      </Col>
    </Row>
  )
}

export default PageHeader;