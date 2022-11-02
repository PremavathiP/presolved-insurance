import React, { useEffect, useState } from 'react';
import { Button, Layout, PageHeader, Row, Tabs, Typography, Col, Card, Space, Empty, Table,Tag  } from 'antd';
import { PlusCircleOutlined, SettingOutlined, UserOutlined, PhoneOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from '@gatsbyjs/reach-router';
import { v1 as uuidv4 } from 'uuid';
import '../assets/style/dashboard.less'
import NewInteraction from './newinteraction';
import  '../../gc-components/chat';


const { Content } = Layout;
const { TabPane } = Tabs;

const getID = () => {
    let id = uuidv4().split("-")[0]
    return id;
}

const ChatPage = () => {



    return (
        <Content className="dashboard">

        
        </Content>
    )
}

export default ChatPage