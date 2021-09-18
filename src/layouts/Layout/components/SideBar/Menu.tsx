import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import IconIndicators from '../../../../Icons/Indicators';

const MainMenu: React.FC = () => {
  return (
    <Menu className="menu" defaultSelectedKeys={["indicadores"]} mode="vertical">
      <Menu.Item key="indicadores" className="menu-item" icon={<div className="menu-item-icon-stroke"><IconIndicators /></div>}>
        <span>Indicadores</span>
        <Link to="/indicadores" />
      </Menu.Item>
     
    </Menu>
  )
}

export default MainMenu;
