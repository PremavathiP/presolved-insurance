import React from 'react';
import {
    PhoneOutlined, UploadOutlined,
    UserOutlined,
    AimOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import p3fsmall from '../assets/images/presolved-small-logo.png';
import p3flogo from '../assets/images/new-big-logo.png'; //'../assets/images/p3f-full.png';
import { Link } from '@gatsbyjs/reach-router';
const { Sider } = Layout;

const DashboardSidebar = ({ collapsed }) => {
    return (
        <Sider theme='light' className='main-sidebar' trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                <Link to="/">
                    <img src={collapsed ? p3fsmall : p3flogo} height={collapsed ? 50 : 100} className={collapsed ? 'collapsed logo' : 'logo'} />
                </Link>
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <Link to='/'>Dashboard</Link>,
                    },
                    {
                        key: 'template_builder',
                        icon: <AimOutlined />,
                        label: <Link to='/template-builder'>Template Dashboard</Link>,
                        children: [{ label: <Link to='/new-template'> New Template</Link>, key: 'create-new-template' }],
                    },
                    {
                        key: 'outbound',
                        icon: <PhoneOutlined />,
                        label: <Link to='/outbound-calls'>Outbound Calls</Link>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'Add Data',
                    },

                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'Reports',
                    },
                ]}
            />
        </Sider>
    )
}

export default DashboardSidebar