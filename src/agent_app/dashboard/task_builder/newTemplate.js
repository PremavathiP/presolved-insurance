import { CalendarOutlined, CheckCircleOutlined, CloseOutlined, DownOutlined, ExclamationCircleOutlined, FileProtectOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons';
import { redirectTo } from '@gatsbyjs/reach-router';
import { Button, Card, Col, Dropdown, Form, Input, Layout, Menu, Modal, PageHeader, Row, Select, Tag, Switch } from 'antd';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { updateTemplates } from '../../store/reducers/config';
import { getTaskTemplates } from '../api/taskTemplates';
import '../assets/style/create-template.less';

const { Content } = Layout;
const CreateNewTemplate = (props) => {
    const dispatch = useDispatch

    const [form] = Form.useForm();
    const initialState = {
        items: [],
        collection: {},
        isEdit: props?.location?.state?.edit || false,
        id: props?.location?.state?.id || null,
        record: props?.location?.state?.record || null,
    }
    useEffect(() => {
        if (props.location.state.edit) {
            let { record } = props.location.state
            let newFormat = {
                ...record,
                fields: JSON.parse(record.attributes)
            }
            form.setFieldsValue({
                task: newFormat              
            })
            setState({...state,items:newFormat.fields})            
        }
    }, []);


    const fields = (
        <Menu onClick={({ key }) => addFields(key)}
            items={[
                {
                    key: 'text',
                    label: <span><FileTextFilled /> Text</span>
                },
                {
                    key: 'textarea',
                    label: <span><FileProtectOutlined /> Text Area</span>
                },
                {
                    key: 'select',
                    label: <span><DownOutlined /> Single Select</span>
                },
                {
                    key: 'date',
                    label: <span><CalendarOutlined /> Date</span>
                },
            ]}
        />
    );

    const removeField = (index) => {
        let { items } = state

        Modal.confirm({
            title: 'Are you sure want to delete field',
            icon: <ExclamationCircleOutlined />,
            content: 'This will delete the selected field',
            okText: 'yes, Delete it',
            cancelText: 'No, Ignore it',
            onOk: () => {
                items.splice(index, 1)
                setState({ ...state, items })
            }
        });

    }

    const addFields = (field) => {
        let { items } = state

        if (field === 'text') {
            items.push({
                id: generateTemplateId(),
                order: items.length + 1,
                type: 'text',
                fieldType: field,
                name: undefined,
                description: undefined,
                defaultValue: undefined,
                required: true
            })
        }
        if (field === 'textarea') {
            items.push({
                id: generateTemplateId(),
                order: items.length + 1,
                type: 'textarea',
                fieldType: field,
                name: undefined,
                rows: 3,
                description: undefined,
                defaultValue: undefined,
                attributes: { visible: true, required: true }
            })
        }
        if (field === 'select') {
            items.push({
                id: generateTemplateId(),
                order: items.length + 1,
                type: 'select',
                fieldType: field,
                name: undefined,
                options: "You, can, Add, Multiple, Options",
                description: undefined,
                defaultValue: undefined,
                attributes: { visible: true, required: true }
            })
        }
        if (field === 'date') {
            items.push({
                id: generateTemplateId(),
                order: items.length + 1,
                type: 'date',
                options: 'date',
                fieldType: field,
                name: undefined,
                description: undefined,
                defaultValue: "-7 days",
                required: false,
            })
        }
        setState({ ...state, items })

    }

    const [state, setState] = useState({ ...initialState })

    const onFinish = (e) => {
        const newTaskTemplate = {
            name: e.task.name,
            description: e.task.description,
            attributes: JSON.stringify(e.task.fields)
        }
        console.log({ newTaskTemplate });

        API.graphql({ query: mutations.createTaskTemplate, variables: { input: newTaskTemplate } }).then((id) => {
            console.log({ id });
            getTaskTemplates().then((taskTemplates) => {
                dispatch(updateTemplates(taskTemplates))
                Modal.confirm({
                    title: 'Success',
                    icon: <CheckCircleOutlined />,
                    content: 'Template Created Successfully',
                    okText: 'Ok',
                    cancelText: 'Close',
                });
                redirectTo("/template-builder")
            })

        }).catch((error) => {
            console.error({ error });
            Modal.confirm({
                title: 'Error Occured',
                icon: <CheckCircleOutlined />,
                content: 'Something went wrong',
                okText: 'Ok',
                cancelText: 'Close',
            });
        })
    }

    const generateTemplateId = (length = 6) => {

        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    return (
        <Content className="dashboard">
            <section className="new-template">
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}>
                        <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()} title="Create a new template" subTitle=" New Interaction" />
                    </Col>
                </Row>
                <Form name="task" form={form} layout="vertical" onFinish={onFinish}  >
                    <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <Card actions={[
                                <Dropdown overlay={fields} placement="bottomLeft" arrow>
                                    <Button type='primary' icon={<PlusOutlined />} > Add Fields</Button>
                                </Dropdown>
                            ]}>
                                <Row gutter={[16, 16]}>
                                    <Col span={10}>
                                        <Form.Item label="Task Name" name={['task', 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter task name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Task Description" name={['task', 'description']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter task description',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea rows={3} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {state.items.map((itm, index) =>


                            <Col span={24} key={index} className="dynamicFields">
                                {itm.type === 'text' && <TextField removeField={removeField} index={index} itm={itm} />}
                                {itm.type === 'textarea' && <TextareaField removeField={removeField} index={index} itm={itm} />}
                                {itm.type === 'select' && <SelectField removeField={removeField} index={index} itm={itm} />}
                                {itm.type === 'date' && <DateField removeField={removeField} index={index} itm={itm} />}
                            </Col>

                        )}

                        <Col span={24} >
                            <Card>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Save Template</Button>
                                </Form.Item>
                            </Card>
                        </Col>

                    </Row>
                </Form>
            </section>
        </Content>
    )
}


const TextField = ({ index, removeField, itm }) => {
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>

                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*  <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value="required">Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const TextareaField = ({ itm, index, removeField }) => {
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item initialValue={itm.rows || 3} label="No Of Rows." name={['task', "fields", index, "rows"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter rows',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*  <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value="required">Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const SelectField = ({ itm, index, removeField }) => {
    const [state, setState] = useState([])
    const updateSignleSelect = (value) => {
        setState(value)

    }
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item initialValue={state} help="Type options and press enter or comma to add next" label="Add Options" name={['task', "fields", index, "options"]}
                    /* rules={[
                        {

                            required: true,
                            message: 'Please enter options',
                        },
                    ]} */
                    >
                        <Select mode="tags" optionFilterProp="label" onChange={(value, option) => updateSignleSelect(value)} placeholder="Add Options" tokenSeparators={[',']} allowClear >

                        </Select>

                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*   <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value='Required'>Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const DateField = ({ itm, index, removeField }) => {

    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Date picker type" name={['task', "fields", index, "options"]}
                        rules={[
                            {

                                required: true,
                                message: 'Please choose date picker type',
                            },
                        ]}
                    >
                        <Select>
                            <option value="date">Single Day select</option>
                            <option value="range">Date Range select</option>
                        </Select>

                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/* <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value='Required'>Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item initialValue={itm.defaultValue} label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

export default CreateNewTemplate