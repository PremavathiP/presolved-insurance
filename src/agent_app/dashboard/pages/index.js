import React, { useEffect, useState } from 'react';
import { Button, Layout, PageHeader, Row, Tabs, Typography, Col, Card, Space, Empty, Table,Tag  } from 'antd';
import { PlusCircleOutlined, SettingOutlined, UserOutlined, PhoneOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from '@gatsbyjs/reach-router';
import { v1 as uuidv4 } from 'uuid';
import '../assets/style/dashboard.less'
import NewInteraction from './newinteraction';
import { GraphConfig } from '../../../gc-components/dummyGraph';


const { Content } = Layout;
const { TabPane } = Tabs;

const getID = () => {
    let id = uuidv4().split("-")[0]
    return id;
}

const AgentIndexPage = () => {

    let initialState = {
        interactions: [
            {
                id: getID()
            }
        ]
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        if (tag === 'loser') {
                            color = 'volcano';
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const dataSource = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['Address Change', 'Renewal'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['Renewal', "New Building"],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['Renewal', 'Enquiry'],
        },
    ];

    const [state, setState] = useState(initialState)
    const add = () => {
        let { interactions } = state
        interactions.push({
            id: getID()
        })
        setState({ ...state, interactions })
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Content className="dashboard">

            <Tabs type="editable-card" onEdit={onEdit} addIcon={<span><PlusCircleOutlined /> Add</span>} >

                <TabPane tab={<div><DashboardOutlined /> Dashboard</div>} key="dashboard" closable>
                    <section className='mywork'>

                        <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                            title="Dashboard" subTitle=" My Work" extra={[<Button icon={<SettingOutlined />} />]} />

                        <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                            <Col span={12}>
                                <Card bodyStyle={{ minHeight: 450 }} title="Messages & Coaching" extra={<Space>
                                    <Button type='dashed' icon={<PlusCircleOutlined />} />
                                    <Button type='dashed' icon={<SettingOutlined />} />
                                </Space>}>
                                    <Empty description="No items" />

                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bodyStyle={{ minHeight: 450 }} title="CSR performance - AHT" extra={<Space>
                                    <Button type='dashed' icon={<PlusCircleOutlined />} />
                                    <Button type='dashed' icon={<SettingOutlined />} />
                                </Space>}>
                                    <GraphConfig test={[{ name: 'khizar' }, { name: 'Sai' }, { name: 'Siva' }, { name: 'Venkat' }]} />

                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bodyStyle={{ minHeight: 450 }}>
                                    <Table size='large' borderRadius={10} columns={columns} dataSource={dataSource} />
                                </Card>
                            </Col>
                        </Row>

                    </section>
                </TabPane>

                {state.interactions.map((interation,index) =>
                    <TabPane tab={<div><PhoneOutlined /> Interation - {interation.id} </div>} key={interation.id} closable>
                        <NewInteraction id={interation.id} key={interation.id} />
                    </TabPane>
                )}


            </Tabs>

            {/* 
            
                 <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                title="Dashboard" subTitle="Initiate a call" />
            <section className='quick-links'>
                <div className='items'>
                    <Button type='dashed' size='large' icon={<PlusCircleOutlined />} />
                    <span className='text'>Add Data</span>
                </div>
                <Link to="/outbound-calls" style={{color:'#000'}}>
                    <div className='items'>

                        <Button type='dashed' size='large' icon={<PhoneOutlined />} />
                        <span className='text'>Outbound Call</span>

                    </div>
                </Link>
                <div className='items'>
                    <Button type='dashed' size='large' icon={<UserOutlined />} />
                    <span className='text'>Execute</span>
                </div>
            </section> */}
        </Content>
    )
}

export default AgentIndexPage