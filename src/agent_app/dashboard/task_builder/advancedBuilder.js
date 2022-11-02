import { SettingOutlined, CalendarOutlined, CheckCircleOutlined, CloseOutlined, DownOutlined, ExclamationCircleOutlined, FileProtectOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons';
import { redirectTo } from '@gatsbyjs/reach-router';
import { Button, Card, Col, Dropdown, Form, Input, Layout, Menu, Modal, PageHeader, Row, Select, Tag, Switch, Space } from 'antd';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { updateTemplates } from '../../store/reducers/config';
import { getTaskTemplates } from '../api/taskTemplates';
import './style/advanced.less';

const { Content } = Layout;
const AdvancedTaskTemplate = (props) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const [columnSettingsform] = Form.useForm();
    const [rowSettingsform] = Form.useForm();



    const initialState = {
        showColumnSettings: false,
        showRowSettings: false,
        selectedColumn: {},
        selectedRow: {},
        columns: {},
        layout: [],
        collection: {},
        isEdit: props?.location?.state?.edit || false,
        id: props?.location?.state?.id || null,
        record: props?.location?.state?.record || null,
    }

    const [state, setState] = useState({ ...initialState })

    const getFields = (id) => {
        return (
            <Menu onClick={({ key }) => addFields(key, id)}
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
        )
    }

    const addFields = (fieldType, id, colPosition) => {
        console.log({ fieldType, id, colPosition });

    }

    const addColumns = () => {

        let { columns } = state
        let layoutID = makeid(5)

        columns[layoutID] = {
            title: null,
            subTitle: null,
            layoutID,
            rowsLength: 3,
            bg: '#ffffff',
            rows: {
                "row1": {
                    id: "row1",
                    width: '33%',
                    bg: '#ffffff',
                    fieldName: "Row1",
                    fieldType: "text"
                },
                "row2": {
                    id: "row2",
                    width: '33%',
                    bg: '#ffffff',
                    fieldName: "Row2",
                    fieldType: "text"
                },
                "row3": {
                    id: "row3",
                    width: '33%',
                    bg: '#ffffff',
                    fieldName: "Row3",
                    fieldType: "text"
                }
            }
        }



        setState({ ...state, columns })
    }

    //generate random alpha numeric id in react ?
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const updateColumnsSettings = (e) => {
        let { columns } = state
        let rows = columns[e.layoutID].rows

        columns[e.layoutID] = {
            ...e,
            rows
        }

        setState({
            ...state,
            columns,
            showColumnSettings: false
        })
    }



    const setColumnSettings = (itm) => {
        let selectedColumn = state.columns[itm.layoutID]

        setState({
            ...state,
            showColumnSettings: true,
            selectedColumn
        })
        columnSettingsform.setFieldsValue({ ...selectedColumn })
    }

    const setRowSettings = (column, row) => {



        setState({
            ...state,
            showRowSettings: true,
            selectedColumn: column,
            selectedRow: row
        })

        //rowSettingsform.setFieldsValue({ ...selectedColumn })
    }
    const updateRowSettings = (e) => {

        console.log({ e });
        /*  let { columns } = state
         columns[e.layoutID] = { ...e }
         setState({
             ...state,
             columns,
             showColumnSettings: false
         }) */
    }
    const deleteRow = (column, row) => {
        let { columns } = state
        let { layoutID } = column
        delete columns[layoutID].rows[row.id]

        setState({
            ...state,
            columns
        })

    }
    const addRow = (column) => {
        let { columns } = state
        let { layoutID } = column

        let Rows = Object.keys(columns[layoutID].rows)
        columns[layoutID].rows["row" + Rows.length + 1] = {
            id: "row" + Rows.length + 1,
            width: '33%',
            bg: '#ffffff',
            fieldName: "Row" + Rows.length + 1,
            fieldType: "text"
        }
        setState({
            ...state,
            columns
        })

    }
    return (
        <Content className="dashboard">
            <section className="new-template">
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}>
                        <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()} title="Advanced Task Builder" subTitle=" New Interaction" />
                    </Col>
                </Row>
                <Form name="task" form={form} layout="vertical"   >
                    <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                        <Col span={24} style={{ marginBottom: 30 }}>
                            <Card actions={[<Button type='primary' icon={<PlusOutlined />} onClick={() => addColumns()} > Add Column</Button>]}>
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
                    </Row>
                    <Row gutter={[16, 16]}>
                        {
                            Object.keys(state.columns).map((record) => {
                                let column = state.columns[record]
                                return (
                                    <Col span={24} key={column.layoutID}>
                                        <Card title={<span>Layout <small><em>{column.layoutID}</em></small></span>} extra={[
                                            <Space>
                                                <Button type='primary' shape='circle' icon={<SettingOutlined />}
                                                    onClick={() => setColumnSettings(column)}
                                                />
                                                <Button type='primary' onClick={() => addRow(column)} shape='circle' icon={<PlusOutlined />} />
                                                <Button type='primary' danger shape='circle' icon={<CloseOutlined />} />
                                            </Space>
                                        ]}>


                                            <div className="tempplateRow">
                                                {
                                                    Object.keys(column.rows).map((rec) => {
                                                        let row = column.rows[rec]
                                                        return (
                                                            <div key={rec} style={{ backgroundColor: row.bg || '#fff', width: row.width }} >
                                                                <h3>{row.fieldName}</h3>
                                                                <div className="templateColumn">
                                                                    <div className='filed-holder'>
                                                                        <Dropdown overlay={getFields(column.layoutID)} placement="bottomLeft"  >
                                                                            <Button type='default' shape='round' icon={<PlusOutlined />} > Add Fields</Button>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className='settings-holder'>
                                                                        <Space>
                                                                            <Button type='primary' size='small' shape='circle' onClick={() => setRowSettings(column, row)} icon={<SettingOutlined />} />
                                                                            <Button type='primary' size='small' danger shape='circle' onClick={() => deleteRow(column, row)} icon={<CloseOutlined />} />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {
                                                    /*  Array.apply(null, { length: column.rowsLength }).map((e, i) =>
                                                         <Col key={i} span={8} style={{ backgroundColor: column.bg || '#fff' }} >
                                                             <div className="templateColumn">
                                                                 <div className='filed-holder'>
                                                                     <Dropdown overlay={getFields(column.layoutID, i)} placement="bottomLeft"  >
                                                                         <Button type='default' shape='round' icon={<PlusOutlined />} > Add Fields</Button>
                                                                     </Dropdown>
                                                                 </div>
                                                                 <div className='settings-holder'>
                                                                     <Button type='default' shape='circle' icon={<SettingOutlined />} />
                                                                 </div>
                                                             </div>
                                                         </Col>
                                                     ) */
                                                }
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })



                        }

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
            <section className='layout-options'>
                <Modal key="columnSettingsModal" onOk={() => columnSettingsform.submit()} closable
                    onCancel={() => setState({ ...state, showColumnSettings: false })}
                    visible={state.showColumnSettings}
                    title={<span>Settings for {state.selectedColumn.layoutID}</span>}>
                    <Form key="ModalPopuForm" form={columnSettingsform} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={updateColumnsSettings}>
                        <Form.Item style={{ display: 'none' }} name="layoutID">
                            <Input type='hidden' />
                        </Form.Item>

                        <Form.Item label="No of Rows" name="rowsLength">
                            <Input type='number' max={9} min={1} />
                        </Form.Item>

                        <Form.Item label="Title" name="title" help="Optional">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Sub Title" name="subTitle" help="Optional">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Background Color" name="bg">
                            <Input type='color' />
                        </Form.Item>

                    </Form>
                </Modal>
                <Modal key="rowSettingsModal" onOk={() => rowSettingsform.submit()} closable
                    onCancel={() => setState({ ...state, showRowSettings: false })}
                    visible={state.showRowSettings}
                    title={<span>Settings for {state.selectedRow.fieldName}</span>}>
                    <Form key="ModalPopuForm" form={rowSettingsform} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={updateRowSettings}>
                        <Form.Item style={{ display: 'none' }} name="layoutID">
                            <Input type='hidden' />
                        </Form.Item>

                        <Form.Item style={{ display: 'none' }} name="rows" initialValue={JSON.stringify(state.selectedRow.rows)}>
                            <Input type='hidden' />
                        </Form.Item>

                        <Form.Item label="No of Rows" name="rowsLength">
                            <Input type='number' max={9} min={1} />
                        </Form.Item>
                        <Form.Item label="Title" name="title" help="Optional">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Sub Title" name="subTitle" help="Optional">
                            <Input />
                        </Form.Item>


                        <Form.Item label="Background Color" name="bg">
                            <Input type='color' />
                        </Form.Item>

                    </Form>
                </Modal>
            </section>
        </Content >
    )
}

{
    /* state.items.map((itm, index) => {
        return (
            <Col span={24} key={index} className="dynamicFields">
                {itm.type === 'text' && <TextField removeField={removeField} index={index} itm={itm} />}
                {itm.type === 'textarea' && <TextareaField removeField={removeField} index={index} itm={itm} />}
                {itm.type === 'select' && <SelectField removeField={removeField} index={index} itm={itm} />}
                {itm.type === 'date' && <DateField removeField={removeField} index={index} itm={itm} />}
            </Col>
        )
    }) */
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
                    <Form.Item initialValue={itm.rowsLength || 3} label="No Of Rows." name={['task', "fields", index, "rowsLength"]}
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

export default AdvancedTaskTemplate