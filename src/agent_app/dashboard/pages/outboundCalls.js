import React, { useRef, useState } from 'react';
import { Layout, PageHeader, Button, Form, Input, Row, Col, Card, Table, Modal } from 'antd';
import { PlusCircleOutlined, UserOutlined, PhoneOutlined, MinusCircleOutlined } from '@ant-design/icons';
import '../assets/style/outbound.less'
import { Link } from '@gatsbyjs/reach-router';
const { Content } = Layout;
import { API, Auth } from 'aws-amplify'
import CSVReader from 'react-csv-reader'



const OutboundCallsPage = () => {
    const inputFile = useRef(null)
    const [form] = Form.useForm();
    const initialState = {
        data: [
            {
                "name": "Sivashanmugam",
                "number": "+14808091830",
                "policynumber": "CMI-AA01",
                "renewaldate": "03-Sep-2022",
                "product": "Religious Institutions",
                "renewalamount": "1000 USD"
            }
        ],
        showTemplateModal: false
    }

    const [state, setState] = useState({ ...initialState })
    const columns = [
        {
            filters: state?.data?.map((rec) => { return { "text": rec.name, "value": rec.name } }),
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            render: (text) => <span><UserOutlined /> {text}</span>,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            filters: state?.data?.map((rec) => { return { "text": rec.number, "value": rec.number } }),
            title: 'Phone',
            dataIndex: 'number',
            key: 'number',
            filterSearch: true,
            onFilter: (value, record) => record.number.indexOf(value) === 0,
        },
        {
            filters: state?.data?.map((rec) => { return { "text": rec.policynumber, "value": rec.policynumber } }),
            title: 'Policy #',
            dataIndex: 'policynumber',
            key: 'policynumber',
            filterSearch: true,
            onFilter: (value, record) => record.policynumber.indexOf(value) === 0,
        },
        {
            filters: state?.data?.map((rec) => { return { "text": rec.renewaldate, "value": rec.renewaldate } }),
            title: 'Renewal Date',
            dataIndex: 'renewaldate',
            key: 'renewaldate',
            filterSearch: true,
            onFilter: (value, record) => record.renewaldate.indexOf(value) === 0,
            sorter: (a, b) => a.renewaldate.length - b.renewaldate.length,
        },
        {
            filters: state?.data?.map((rec) => { return { "text": rec.product, "value": rec.product } }),
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            filterSearch: true,
            onFilter: (value, record) => record.product.indexOf(value) === 0,
            sorter: (a, b) => a.product.length - b.product.length,
        },
        {
            filters: state?.data?.map((rec) => { return { "text": rec.renewalamount, "value": rec.renewalamount } }),
            title: 'Renewal Amount',
            dataIndex: 'renewalamount',
            key: 'renewalamount',
            filterSearch: true,
            onFilter: (value, record) => record.renewalamount.indexOf(value) === 0,
            sorter: (a, b) => a.renewalamount.length - b.renewalamount.length,
            render: (text) => <span><UserOutlined /> {text}</span>,
        },
    ]
    const onButtonClick = () => setState({ ...state, showTemplateModal: true })
    
    const onFileLoaded = (data, fileInfo) => {
        const json=data
        if (json.length > 0) {
            let record = json[0]
            if (record?.name && record?.number) {
                let newData = []
                json.map((rec) => {
                    if ((rec.name !== "" && rec.name !== undefined) || (rec.number !== "" && rec.number !== undefined)) {
                        newData.push(rec)
                    }
                })
                setState({ ...state, showTemplateModal: false, data: newData })
            }
            else {
                console.error("Invalid Format")
            }
        }
    }

    const executeCalls = () => {
        let { data } = state
        data.map((rec) => {
            { console.log("Calling :: ", rec); }
            const init = {
                body: { ...rec }
            }
            API.post("StartOutboundCall", "/call", init).then((result) => {
                console.log({ result });
            })
        })

    }


    return (
        <Content className="outboundcalls-page">
            <PageHeader ghost={false} className="site-page-header" onBack={() => null} title="Outbound Calls" subTitle="Initiate a call" />


            <section className='form-section'>
                <PageHeader ghost={false} className="site-page-header" subTitle="Upload Data" extra={[
                    <Button onClick={() => executeCalls()} type='primary' size='large' icon={<PhoneOutlined />}
                    >Initiate Calls </Button>,
                    <Button onClick={onButtonClick} type='dashed' size='large' icon={<PlusCircleOutlined />} >Upload CSV </Button>,
                ]} />
                <Table columns={columns} dataSource={state.data} size="large" bordered />
            </section>

            <Modal title="Basic Modal" okText="Upload File"
                onOk={() => inputFile.current.click()}
                visible={state.showTemplateModal} onCancel={() => setState({ ...state, showTemplateModal: false })}>
                <h4>Please Upload the CSV file in the below attached format</h4>
                <Button type='dashed'
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/template.csv`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                    }}
                >Download Template</Button>

            </Modal>
            <CSVReader inputStyle={{ display: 'none' }} inputId='file' inputRef={inputFile} parserOptions={{ header: true }}
                onFileLoaded={onFileLoaded}

            />
        </Content>
    )
}

export default OutboundCallsPage



/* 

 <Form layout="vertical" form={form} onFinish={onFinish}  >
                    {state.data.map((rec, index) =>
                        <Card key={index} bordered bodyStyle={{ padding: 15 }}
                            extra={index == 0 ? [<Button onClick={() => addData()} type='primary' icon={<PlusCircleOutlined />} />] : null}>
                            <Row gutter={[16, 16]}>
                                <Col span={4}>
                                    <Form.Item help label="Customer Name" name={['formData', index, 'name']}>
                                        <Input placeholder="Customer Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Phone Number" name={['formData', index, 'number']}>
                                        <Input placeholder="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Policy Number" name={['formData', index, 'policynumber']}>
                                        <Input placeholder="Policy Number" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Renewal Date" name={['formData', index, 'renewaldate']}>
                                        <Input placeholder="Renewal Date" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Renewal Amount" name={['formData', index, 'renewalamount']}>
                                        <Input placeholder="Renewal Amount" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Product" name={['formData', index, 'product']}>
                                        <Input placeholder="Product" />
                                    </Form.Item>
                                    {index !== 0 && <Button danger onClick={() => removeData(index)} type='primary' icon={<MinusCircleOutlined />} />}
                                </Col>
                            </Row>

                        </Card>
                    )}
                    <Card bordered bodyStyle={{ padding: 15 }} style={{ marginTop: 30 }} >
                        <Row gutter={[16, 16]}>
                            <Col span={4} offset={18}>
                                <Button block icon={<PhoneOutlined />} type='primary' size='large'>Initiate Call</Button>
                            </Col>
                        </Row>
                    </Card>
                </Form>

*/