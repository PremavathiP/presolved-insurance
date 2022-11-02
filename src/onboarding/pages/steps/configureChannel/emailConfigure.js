import React from 'react';
import { Form, Input,Button } from 'antd';

const EmailConfigure=(props)=>{
    const onFinish = (values) => {
        props.emailConfigure(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <Form
                name="emailForm"
                layout='vertical'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label='Email Address' name='emailAddress' rules={[{ required: true, message: 'Please input your Email address!' }]}>
                   <Input/>
                </Form.Item>
                <Form.Item label='Email Box' name='emailBox' rules={[{ required: true, message: 'Please input your Email box' }]}>
                   <Input/>
                </Form.Item>
                <Form.Item label='Microsoft graph Client identifier' name='clientIdentifier' rules={[{ required: true, message: 'Please input your Microsoft graph Client identifier!' }]}>
                   <Input/>
                </Form.Item>
                <Form.Item label='Microsoft graph Client secret' name='clientSecret' rules={[{ required: true, message: 'Please input your Microsoft graph Client secret!' }]}>
                   <Input/>
                </Form.Item>
                <Form.Item>
                <Button type="default" htmlType="submit" size='small'>
                    Save
                </Button>
            </Form.Item>
            </Form>
            
    );
}

export default EmailConfigure;