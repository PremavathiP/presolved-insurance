import { Button, Card, Col, Divider, Form, Input, List, Radio, Result, Row, Select, Space, Steps, Switch, Typography } from 'antd';
import React, { useState } from 'react';
import { MailOutlined, MessageOutlined, PhoneOutlined, ApartmentOutlined, WechatOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ils1 from '../../assets/images/illustrations/signup-4.svg';


const { Step } = Steps;
const ChooseChannel = (props) => {

    const { next, state, setState, prev } = props

    const onFinish = (e) => {
        console.log({ e });
    }

    return (
        <div className='steps-channel'>
            <Row gutter={[16, 16]} align='top' justify='space-evenly'>

                <Col span={8} className="imgsidebar"> <img src={ils1} className="sideimg" /></Col>

                <Col span={16}>
                    <Typography.Title level={3}>Choose Your required Channels</Typography.Title>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <div className='channels'>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <PhoneOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Phone</Typography.Title>
                                            <Switch
                                                onChange={() => setState({
                                                    ...state,
                                                    channel: {
                                                        ...state.channel,
                                                        isPhoneSelected: !state.channel.isPhoneSelected
                                                    }
                                                })}
                                                defaultChecked={state.channel.isPhoneSelected}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <MailOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Email</Typography.Title>
                                            <Switch
                                                onChange={() => setState({
                                                    ...state,
                                                    channel: {
                                                        ...state.channel,
                                                        isEmailSelected: !state.channel.isEmailSelected
                                                    }
                                                })}
                                                defaultChecked={state.channel.isEmailSelected}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <MessageOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Chat</Typography.Title>
                                            <Switch
                                                onChange={() => setState({
                                                    ...state,
                                                    channel: {
                                                        ...state.channel,
                                                        isChatSelected: !state.channel.isChatSelected
                                                    }
                                                })}
                                                defaultChecked={state.channel.isChatSelected}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={22}>
                            <Form name="form2" layout='vertical' size='large' onFinish={onFinish}
                                initialValues={{
                                    channel: {
                                        number: state.channel.phone.numberType
                                    }
                                }}
                            >
                                <Steps direction="vertical" current={[]} >
                                    {state.channel.isPhoneSelected &&
                                        <Step status='finish' subTitle="Update all required information" title="Phone" icon={<PhoneOutlined style={{ fontSize: 30 }} />}
                                            tailContent={<p>Please choose the services</p>}
                                            description={<RenderPhone {...props} />}
                                        />

                                    }

                                    {state.channel.isEmailSelected &&
                                        <Step status='finish' subTitle="Update all required information" title="E-mail"
                                            icon={<MailOutlined style={{ fontSize: 30 }} />}
                                            tailContent={<p>Please choose the services</p>}
                                            description={<RenderEmail {...props} />}
                                        />
                                    }
                                    {state.channel.isChatSelected &&
                                        <Step status='finish' subTitle="Update all required information" title="E-mail"
                                            icon={<WechatOutlined style={{ fontSize: 30 }} />}
                                            tailContent={<p>Please choose the services</p>}
                                            description={<RenderChat {...props} />}
                                        />
                                    }
                                    {
                                        !state.channel.isPhoneSelected &&
                                            !state.channel.isEmailSelected &&
                                            !state.channel.isChatSelected ?
                                            <Step icon={<ApartmentOutlined style={{ fontSize: 30 }} />} status="error" title="Choose atleast 1 service" description={
                                                <Card>
                                                    <Result title="Choose atleast 1 services to proceed further" status="500" />
                                                </Card>}
                                            /> :

                                            <Step status="finish" title="Proceed" description={
                                                <Card>
                                                    <Space>
                                                        <Button type="ghost" size='large' onClick={() => prev()} >Previous</Button>
                                                        <Button type="primary" htmlType="submit" size='large'>Next</Button>
                                                    </Space>
                                                </Card>
                                            } />
                                    }
                                </Steps>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};


const RenderChat = (props) => {
    const { next, state, setState, prev } = props
    const [st, setst] = useState({
        intentSelected:"greetings",

        intents: [
            { "label": "Greetings", "value": "greetings" },
            { "label": "Welcome", "value": "welcome" },
            { "label": "Inquiry", "value": "inquiry" },
            { "label": "Operator", "value": "operator" },
            { "label": "Renewal", "value": "renewal" },
        ],
        utterances:[
            { "intents": "greetings", "value": "Hello there" },
            { "intents": "greetings", "value": "How are you" },
            { "intents": "greetings", "value": "How may i help" },
            { "intents": "welcome", "value": "Welcome" },
            { "intents": "welcome", "value": "Good day" },
            { "intents": "welcome", "value": "Its good to see you" },
            { "intents": "renewal", "value": "When is next due date" },
            { "intents": "renewal", "value": "want to renew" },
            { "intents": "renewal", "value": "remind me for next" },
        ]
    })
   
    return (
        <Row>
            <Col span={24}>
                <Card title="Intents / Category">
                    <Row gutter={[16, 16]}>
                        <Col span={10}>
                            <p>Manage Intents</p>
                            <Input placeholder='Add Intents' />
                            <Divider > Available intents </Divider>
                            <List                                
                                itemLayout='horizontal'
                                bordered
                                dataSource={st.intents}
                                renderItem={item => (
                                    <List.Item onClick={()=> setst({...st,intentSelected:item.value}) } 
                                    style={{
                                        cursor:'pointer',
                                        background:st.intentSelected === item.value ? '#aaa5fa' : '#fff'
                                        
                                        }}>
                                        <Typography.Text><UnorderedListOutlined /> {item.label}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={14}>
                            <p>Utterncases for <em>{st.intentSelected}</em></p>
                            <Input placeholder={`Add Utterances for ${st.intentSelected}`}
                            
                            onChange={(e)=> {
                                let  {utterances} =st
                                utterances.push({intents:st.intentSelected, value:e.target.value })
                                setst({...st,utterances})
                            }}
                            />
                              <Divider > Available Utterances </Divider>
                            <List           
                                header={<p>Utterances of {st.intentSelected} </p>}                     
                                itemLayout='horizontal'
                                bordered
                                dataSource={st.utterances.filter((rec)=>rec.intents==st.intentSelected)}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text>{item.value}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

const RenderEmail = (props) => {
    const { next, state, setState, prev } = props
    //Email Box, Microsoft graph client identifier, Microsoft graph client secret
    return (
        <Row>
            <Col span={24}>
                <Card>
                    <Form.Item name={["channel", "email", "address"]} label="Email Box / Address ID" rules={[{ required: true, message: 'Please input your E-Mail Address' }]}>
                        <Input inputMode='email' />
                    </Form.Item>
                    <Form.Item name={["channel", "email", "clientID"]} label="client identifier / Client ID" rules={[{ required: true, message: 'Please input your  client identifier' }]}>
                        <Input inputMode='email' />
                    </Form.Item>
                    <Form.Item name={["channel", "email", "clientSecret"]} label="client secret " rules={[{ required: true, message: 'Please input your  client secret' }]}>
                        <Input inputMode='email' />
                    </Form.Item>
                </Card>
            </Col>
        </Row>
    )
}
const RenderPhone = (props) => {
    const { next, state, setState, prev } = props
    return (
        <Row>
            <Col span={24}>
                <Card>
                    <Form.Item name={["channel", "phone", "numberType"]} label="Which number do you want to use ?">
                        <Radio.Group>
                            <Radio.Button
                                defaultChecked={state.channel.phone.numberType === 'existing' ? true : false}
                                onChange={() => setState({
                                    ...state,
                                    channel: {
                                        ...state.channel,
                                        phone: {
                                            ...state.channel.phone,
                                            numberType: "existing"
                                        }
                                    }
                                })}
                                type='primary' value="existing">Use my old phone number</Radio.Button >
                            <Radio.Button
                                onChange={() => setState({
                                    ...state,
                                    channel: {
                                        ...state.channel,
                                        phone: {
                                            ...state.channel.phone,
                                            numberType: "new"
                                        }
                                    }
                                })}

                                value="newnumber">Allocate new number</Radio.Button >

                        </Radio.Group>
                    </Form.Item>
                    <Divider />

                    {state.channel.phone.numberType === 'existing' &&
                        <Form.Item label='Enter your number' name={["channel", "phone", "existing"]}
                            rules={[{ required: true, message: 'Please input your old number' }]} style={{ marginTop: '20px' }}>
                            <Input />
                        </Form.Item>
                    }

                    {state.channel.phone.numberType == 'new' &&
                        <div>

                            <Form.Item label='Choose New number options' name={["channel", "phone", "new"]}
                                rules={[{ required: true, message: 'Choose New number options' }]} style={{ marginTop: '20px' }}>
                                <Radio.Group defaultValue="tfn">
                                    <Radio.Button
                                        onChange={() => setState({
                                            ...state,
                                            channel: {
                                                ...state.channel,
                                                phone: {
                                                    ...state.channel.phone,
                                                    isnew: true,
                                                    new: "tfn"
                                                }
                                            }
                                        })}
                                        type='primary' value="TFN">TFN</Radio.Button >
                                    <Radio.Button
                                        onChange={() => setState({
                                            ...state,
                                            channel: {
                                                ...state.channel,
                                                phone: {
                                                    ...state.channel.phone,
                                                    isnew: true,
                                                    new: "did"
                                                }
                                            }
                                        })}
                                        value="newnumber">DID</Radio.Button >
                                    {state.channel.phone.new === 'tfn' &&
                                        <Form.Item label='Enter TFN number' name={["channel", "phone", "tfn"]}
                                            rules={[{ required: true, message: 'Please input your TFN number' }]} style={{ marginTop: '20px' }}>
                                            <Input />
                                        </Form.Item>
                                    }
                                    {state.channel.phone.new === 'did' &&
                                        <Form.Item label='Enter DID number' name={["channel", "phone", "did"]}
                                            rules={[{ required: true, message: 'Please input your DID number' }]} style={{ marginTop: '20px' }}>
                                            <Input />
                                        </Form.Item>
                                    }


                                </Radio.Group>
                            </Form.Item>
                        </div>
                    }


                </Card>

            </Col>
        </Row>
    )
}

export default ChooseChannel;