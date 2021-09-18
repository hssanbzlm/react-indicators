import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Menu from "./Menu";
import 'antd/dist/antd.css';

import "./SideBar.css";

const { Sider} = Layout;

const MainSideMenu: React.FC = () => { 

  return (
    <Sider 
    breakpoint="lg"
    collapsedWidth="0"
    className="side-menu"
    width={230} 
    >  
      <Header/>
      <Menu />
    </Sider>
  );
};

export default MainSideMenu;
