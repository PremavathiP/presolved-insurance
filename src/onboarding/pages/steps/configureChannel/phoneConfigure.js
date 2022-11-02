
import React, { useState } from 'react';
import { Form, Input, Radio, Button ,Space} from 'antd';


const PhoneConfigure = (props) => {
    const [value, setValue] = useState(1);
    const [subValue, setSubValue] = useState(1);
    const [showOption, setShowOption] = useState(false);
    const [showSubOption, setShowSubOption] = useState(false);

    const phoneNumberOptions = [
        { label: 'Use my old phone number', value: 'oldNumber' },
        { label: 'Allocate new number', value: 'newNumber' }
    ];

    const phoneNumberSubOptions = [
        { label: 'TFN', value: 'TFN' },
        { label: 'DID', value: 'DID' }
    ];

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value === 'newNumber') {
            setShowOption(true);
        }
        else {
            setShowOption(false),
            setShowSubOption(false)
        };
    };

    const onChangeSubValue = (e) => {
        setSubValue(e.target.value);
        if(e.target.value=='TFN'){
            setShowSubOption(true);
        }else setShowSubOption(false);
    };

    const onFinish = (values) => {
        props.phoneConfigure(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="phoneConfigure"
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item initialValue={'oldNumber'} label='Select number' name='phoneNumberType' rules={[{ required: true, message: 'Please select any one number' }]}>
                <Space><Radio.Group onChange={onChange} value={value} name='phoneNumberRadio' options={phoneNumberOptions} optionType='button' /></Space>
            </Form.Item>
            {!showOption &&
                <Form.Item label='Enter your number' name='oldPhoneNumber' rules={[{ required: true, message: 'Please input your old number' }]} style={{ marginTop: '20px' }}>
                    <Input />
                </Form.Item>
            }
            {showOption &&
                <Form.Item label='Choose option' name='newNumberSubOption' rules={[{ required: true, message: 'Please select any one method' }]} style={{ marginTop: '20px' }}>
                    <Space><Radio.Group onChange={onChangeSubValue} value={subValue} name='phoneNumberSubRadio' options={phoneNumberSubOptions} optionType='button' /></Space>
                </Form.Item>
            }
            {showSubOption &&
                <Form.Item label='Number of TFN required' name='noOfTFN' rules={[{ required: true, message: 'Please input your required number of TFN' }]} style={{ marginTop: '20px' }}>
                    <Input />
                </Form.Item>
            }
            <Form.Item>
                <Button type="default" htmlType="submit" size='small'>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PhoneConfigure;

