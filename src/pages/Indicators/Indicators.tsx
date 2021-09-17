import React, { useState } from "react";
import { Layout } from "antd";
import PageHeader from "./components/PageHeader";
import PageContent from "./components/PageContent";
import "./Indicators.css";
import { addDays } from 'date-fns';
import { Ranges } from "../../helpers/Interfaces";


const { Content } = Layout;

const Indicators: React.FC<{}> = () => { 
  
  const [range, setRange] = useState<[Ranges]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),//selecting one week for current day by default
      key: 'selection'
    }
  ]);
     return (
      <Layout style={{ minHeight: "100vh", minWidth: "100%" }}>
        <Content className="indicators-content">
          <PageHeader change={setRange} value={range} /> 
          <PageContent range={range} /> 
        </Content>
      </Layout>
  )
};

export default Indicators;