import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Typography, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import p3flogo from '../assets/images/presolved-small-logo.png';
const { Header } = Layout
const OnBoardHeader = ({ setCollapsed, collapsed }) => {
    const [state, setState] = useState({
        isLoggedin: false
    })
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (user.isLoggedin) {
            setState({ ...state, ...user })
        }
    }, [user])


    return (
 

        <Header>
            <div className='logo'>
                <img src={p3flogo} height={45} />
            </div>
            <div className='userinfo'>
                {!state.isLoggedin ?
                    <Space>
                        <Avatar icon={<UserOutlined />} />
                    </Space>
                    :
                    <Space>
                        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                        <Typography.Text>{state.email}</Typography.Text>
                        {/* <Typography.Text>{state.name} - {state.username}</Typography.Text>
                                <div id="username" style={{ display: 'none' }}>{state.username}</div> */}
                    </Space>
                }
            </div>
        </Header>



    )
}

export default OnBoardHeader