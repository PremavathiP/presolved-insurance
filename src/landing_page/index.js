import { HomeOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import React from 'react';
import logo from './assets/images/logo.png';


import { Link, Router } from '@gatsbyjs/reach-router';
import 'antd/dist/antd.less';
import './assets/style/index.less';
import LandingContent from './content';

const { Header,  Footer } = Layout;
const LandingPage = () => {
    const mainMenu = [
        { key: 'home', label: <span><HomeOutlined /> Home</span> },
        { key: 'products', label: <span><LaptopOutlined /> Products</span> },
        { key: 'Solutions', label: <span><NotificationOutlined /> Solutions</span> },
        { key: 'pricing', label: <span><UserOutlined /> pricing</span> },
    ]
    const headerMenu = [
        { key: 'home', label: <span><HomeOutlined /> Home</span> },
        { key: 'products', label: <span><LaptopOutlined /> Products</span> },
        { key: 'Solutions', label: <span><NotificationOutlined /> Solutions</span> },
        { key: 'pricing', label: <span><UserOutlined /> pricing</span> },
    ]

    return (
        <Layout className='signup_page'>
            <Header className="main-header">
                <div className="logo"><a href="/site"><img src={logo} height={50} /></a></div>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} items={headerMenu} />
            </Header>

            <Header className="menu-header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} items={mainMenu} />
            </Header>
            <section className='banner'>
                <div className='content'>
                    <Typography.Title level={2}>Amazon Connect</Typography.Title>
                    <Typography.Title level={4}>Easy-to-use cloud customer service contact center
                    </Typography.Title>
                    <div className='banner-button'>
                        <Button type='link' className='signup'>
                            <Link to="/signup"> Create a Account</Link>
                        </Button>
                        <Button type='link' className='learnmore'>
                            <Link to="/signup"> Learn more</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <Router>
                <LandingContent path="/" />                
            </Router>          
            <Footer
                style={{ textAlign: 'center', }}
            >
                Presolved  ©2018
            </Footer>
        </Layout>
    )
}

export default LandingPage