import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/theme.less';

import { Layout, notification } from 'antd';
import { Router } from '@gatsbyjs/reach-router';
import DashboardHeader from './layout/header';
import DashboardSidebar from './layout/sidebar';
import AgentIndexPage from './pages';
import OutboundCallsPage from './pages/outboundCalls';
import TemplateBuilder from './task_builder';
import CreateNewTemplate from './task_builder/newTemplate';
import AdvancedBuilder from './task_builder/advancedBuilder';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskTemplates, getAllChannels, getAllUsersFromConnect } from './api/taskTemplates';
import { updateTemplates } from '../store/reducers/config';
import { updateChannels } from '../store/reducers/channels';

import '../../gc-components/chat'
import DND from './task_builder/dnd';


const { Content } = Layout;
const APP = () => {
    const dispatch = useDispatch()
    const config = useSelector((state) => state.config)
    const channels = useSelector((state) => state.channels)
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        if (!config.templates.isLoaded) {
            getAllUsersFromConnect().then((allUsers) => {
                console.log({ allUsers })
            }).catch((error) => {
                notification.error({
                    description: error.message,
                    duration:10,
                    message: "Unable to load  getAllUsersFromConnect",
                    type: 'error'

                })
            })

            getTaskTemplates().then((taskTemplates) => {
                dispatch(updateTemplates(taskTemplates))
            }).catch((error) => {
                notification.error({
                    message: "Unable to load the configs",
                    description: error.message,
                    type: 'error'

                })
            })
        }
        if (!channels.isLoaded) {
            getAllChannels().then((result) => {
                dispatch(updateChannels(result))
            }).catch((error) => {
                notification.error({
                    description: error.message,
                    message: "Unable to load the channels",
                    type: 'error'

                })
            })
        }
    }, []);

    return (
        <Layout className='newdashboard'>
            <DashboardSidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <DashboardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="main" style={{ minHeight: '100vh', }}>
                    <Router>
                        <AgentIndexPage path="/" />
                        <OutboundCallsPage path="/outbound-calls" />
                        <TemplateBuilder path="/template-builder" />
                        <CreateNewTemplate path="/new-template" />
                        <AdvancedBuilder path="/advanced-template" />
                        <DND path="/dnd" />
                    </Router>

                </Content>
            </Layout>
        </Layout>
    )
}

export default APP