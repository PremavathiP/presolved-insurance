
import { Button, Card, Col, Divider, Form, Input, Radio, Row, Space, Typography, Switch } from 'antd';

import { QuestionOutlined, SelectOutlined, PhoneOutlined, AmazonOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ils1 from '../../assets/images/illustrations/signup-2.svg'
import presolvedLogo from '../../assets/images/presolved-small-logo.png'

const SelectAccount = (props) => {
    
    const { next, state, setState } = props
    const onFinish = (values) => {
        setState({...state,step1:values});
        next();
    };


    return (
        <div style={{ padding: '15px', }}>
            <Row gutter={[16, 16]} align='stretch' justify='space-evenly'>
                <Col span={8} className="imgsidebar">
                    <img src={ils1} className="sideimg" />
                </Col>
                <Col span={16}>
                    <Typography.Title level={3}>Please choose the Account type</Typography.Title>
                    <Divider />
                    {/* Choosing account type Buttons  */}
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div className='account-type'>
                                <Card className={`items ${state.accountType == 0 && "selected"} `} extra={[<QuestionOutlined />]}
                                    onClick={() => { setState({ ...state, accountType: 0 }) }}
                                >
                                    <Row align='middle' gutter={[16, 16]}  >
                                        <Col span={4}>
                                            <AmazonOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={20}>
                                            <Typography.Title level={3}>Self Managed AWS account</Typography.Title>

                                        </Col>
                                    </Row>
                                </Card>

                                <Card className={`items ${state.accountType == 1 && "selected"} `} extra={[<QuestionOutlined />]}
                                    onClick={() => { setState({ ...state, accountType: 1 }) }}
                                >
                                    <Row align='middle' gutter={[16, 16]}  >
                                        <Col span={4}>
                                            <img src={presolvedLogo} height={50} />
                                        </Col>
                                        <Col span={20}>
                                            <Typography.Title level={3}>Presolved Managed AWS account</Typography.Title>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                    </Row>


                    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                        <Col span={24}>
                            {/* Forms based on user input */}

                            {state.accountType == 0 &&
                                <Form size='large' name="step1" layout='vertical' labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onFinish={onFinish} autoComplete="off" >
                                    <Form.Item style={{ display: 'none' }} name={['account', 'type']} initialValue={state.accountType == 0 ? 'selfManagedAccount' : 'presolvedAccount'} >
                                        <Input type='hidden' />
                                    </Form.Item>
                                    <Card style={{}}>
                                        <Form.Item
                                            label="Account ID"
                                            name={['account', 'selfManagedAccount', 'ID']}
                                            rules={[{ required: true, message: 'Please input your account id!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Next
                                            </Button>
                                        </Form.Item>
                                    </Card>
                                </Form>
                            }
                            {
                                state.accountType == 1 &&
                                <Form size='large' layout='vertical' labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onFinish={onFinish} autoComplete="off" >
                                    <Form.Item style={{ display: 'none' }} name={['account', 'type']} initialValue={state.accountType == 0 ? 'selfManagedAccount' : 'presolvedAccount'} >
                                        <Input type='hidden' />
                                    </Form.Item>
                                    <Card style={{}}>
                                        <Form.Item label="Account ID" name="selfAccountId" rules={[{ required: true, message: 'Please input your account id!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Account Name" name="presolvedAccountName" rules={[{ required: true, message: 'Please input your Account Name!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Email Id" name="presolvedEmailId" rules={[{ required: true, message: 'Please input your email id!' }]} >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Next
                                            </Button>
                                        </Form.Item>
                                    </Card>
                                </Form>
                            }
                        </Col>

                    </Row>

                    {/*  
                        <Col span={24}>
                            <Form size='large' name="step1" layout='vertical' labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onFinish={onFinish} autoComplete="off" >
                                <Form.Item style={{ display: 'none' }} name={['account', 'type']} initialValue={state.accountType == 0 ? 'selfManagedAccount' : 'presolvedAccount'} >
                                    <Input type='hidden' />
                                </Form.Item>
                                <Card.Grid style={{ width: '100%', opacity: state.accountType == 0 ? 1 : 0.5 }}>
                                    <Typography.Title level={5}>
                                        Self Managed AWS account
                                    </Typography.Title>
                                    <Divider />
                                    <Typography.Paragraph>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </Typography.Paragraph>
                                    <Divider />
                                    {state.accountType == 0 &&
                                        <Card style={{ border: 0 }}>
                                            <Form.Item
                                                label="Account ID"
                                                name={['account', 'selfManagedAccount', 'ID']}
                                                rules={[{ required: true, message: 'Please input your account id!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Next
                                                </Button>
                                            </Form.Item>


                                        </Card>
                                    }
                                    {state.accountType !== 0 &&
                                        <Space>
                                            <Button onClick={() => setState({ ...state, accountType: 0 })} size='large' type='primary' icon={<SelectOutlined />} >Choose</Button>
                                            <Button size='large' type='ghost' icon={<QuestionOutlined />} >Help</Button>
                                        </Space>}

                                </Card.Grid>
                            </Form>
                        </Col>
                        <Col span={24}>
                            <Form
                                size='large'
                                name="step1"
                                layout='vertical'
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 14 }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item style={{ display: 'none' }} name={['account', 'type']} initialValue={state.accountType == 0 ? 'selfManagedAccount' : 'presolvedAccount'}>
                                    <Input type='hidden' />
                                </Form.Item>
                                <Card.Grid style={{ width: '100%', opacity: state.accountType == 1 ? 1 : 0.5 }}>
                                    <Typography.Title level={5}>
                                        Presolved Managed AWS account
                                    </Typography.Title>
                                    <Divider />
                                    <Typography.Paragraph>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </Typography.Paragraph>
                                    <Divider />
                                    {state.accountType == 1 &&
                                        <Card>
                                            <Form.Item
                                                label="Account Name"
                                                name={['account', 'presolvedAccount', 'Name']}

                                                rules={[{ required: true, message: 'Please input your Account Name!' }]}
                                            >
                                                <Input />
                                            </Form.Item>



                                            <Form.Item
                                                label="Email Id"
                                                name={['account', 'presolvedAccount', 'emailId']}

                                                rules={[{ required: true, message: 'Please input your email id!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Next
                                                </Button>
                                            </Form.Item>

                                        </Card>
                                    }
                                    {state.accountType !== 1 &&
                                        <Space>
                                            <Button onClick={() => setState({ ...state, accountType: 1 })} size='large' type='primary' icon={<SelectOutlined />} >Choose</Button>
                                            <Button size='large' type='ghost' icon={<QuestionOutlined />} >Help</Button>
                                        </Space>
                                    }
                                </Card.Grid>
                            </Form>
                        </Col>
                    </Row> */}


                    {/* 
                    <Radio.Group onChange={onChange} value={value} options={state.accountType} optionType="button" />
                    <div style={{ justify: 'start', alignContent: 'center', margin: '25px 0 25px 0' }}>
                        <Form
                            size='large'
                            name="step1"
                            layout='vertical'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 14 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            
                                <Form.Item
                                    label="Account ID"
                                    name="selfAccountId"
                                    rules={[{ required: true, message: 'Please input your account id!' }]}
                                >
                                    <Input />
                                </Form.Item>
                        
                            
                                <Form.Item
                                    label="Account Name"
                                    name="presolvedAccountName"
                                    rules={[{ required: true, message: 'Please input your Account Name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                            
                        
                                <Form.Item
                                    label="Email Id"
                                    name="presolvedEmailId"
                                    rules={[{ required: true, message: 'Please input your email id!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            }
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Next
                                </Button>
                            </Form.Item>

                        </Form>
                    </div> */}


                </Col>
            </Row>



        </div>

    );

}

export default SelectAccount;