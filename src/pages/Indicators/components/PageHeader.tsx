import React from 'react';
import { Row, Col } from "antd";
import Calendar, { OnChangeDateCallback } from 'react-calendar';

interface columnProps{
  change:OnChangeDateCallback;
  value:Date;
}

const PageHeader: React.FC<columnProps> = ({change,value}) => {  
  return (
    <Row>
      <Col span={24}>
        <div className="page-title">
          charts
        </div> 
        <div className="header-calendar" > 
            <Calendar   
            onChange={change} 
            value={value}
            />
        </div>
      </Col>
    </Row>
  )
}

export default PageHeader;