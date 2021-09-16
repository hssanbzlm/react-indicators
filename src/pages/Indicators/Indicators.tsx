import React, { useState } from "react";
import { Layout } from "antd";
import PageHeader from "./components/PageHeader";
import PageContent from "./components/PageContent";
import "./Indicators.css";

const { Content } = Layout;

const Indicators: React.FC<{}> = () => { 
  
  const [value,onChange]=useState(new Date());
     return (
      <Layout style={{ minHeight: "100vh", minWidth: "100%" }}>
        <Content className="indicators-content">
          <PageHeader change={onChange} value={value} />
          <PageContent date={value} />
        </Content>
      </Layout>
  )
};

export default Indicators;