
import React, { useEffect, useState } from 'react';
import { Tabs, Button, Space } from 'antd';
import PhoneConfigure from './configureChannel/phoneConfigure';
import ChatConfigure from './configureChannel/chatConfigure';
import EmailConfigure from './configureChannel/emailConfigure';
import TabPane from 'antd/lib/tabs/TabPane';

const ConfigureChannel = (props) => {

    const selectedChannel = props.selectedChannel;

    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const [statePhone, setStatePhone] = useState({
        phoneNumberType: "",
        oldPhoneNumber: "",
        newNumberSubOption: "",
        noOfTFN: "",
    });

    const [stateEmail, setStateEmail] = useState({
        emailAddress: "",
        emailBox: "",
        clientIdentifier: "",
        clientSecret: ""
    });

    const [stateChat, setStateChat] = useState({});

    console.log('selectedChannel', selectedChannel)

    const setVisibleFunction = () => {
        if (selectedChannel.some(item => (item === 'Phone')))
            setShowPhone(true);
        if (selectedChannel.some(item => (item === 'Email')))
            setShowEmail(true);
        if (selectedChannel.some(item => (item === 'Chat')))
            setShowChat(true);
    }

    const phoneConfigure = (value) => {
        setStatePhone(() => ({
            ...statePhone,
            phoneNumberType: value.phoneNumberType,
            oldPhoneNumber: value.oldPhoneNumber,
            newNumberSubOption: value.oldPhoneNumber,
            noOfTFN: value.noOfTFN,
        }));
    }

    const chatConfigure = (value) => {
        console.log(value);
    }
    
    const emailConfigure = (value) => {
        setStateEmail(() => ({
            ...stateEmail,
            emailAddress: value.emailAddress,
            emailBox: value.emailBox,
            clientIdentifier: value.clientIdentifier,
            clientSecret: value.clientSecret
        }));
    }

    useEffect(() => {
        setVisibleFunction();
    }, []);

    return (

        <div>
            <Tabs

                size={'large'}
                defaultActiveKey="1"
                style={{
                    marginBottom: 32,
                }}
            >
                {showPhone && <Tabs.TabPane tab="Phone" key="1" style={{ padding: '10px' }}>
                    <PhoneConfigure phoneConfigure={phoneConfigure} />
                </Tabs.TabPane>}
                {showEmail && <Tabs.TabPane tab="Email" key="2" style={{ padding: '10px' }}>
                    <EmailConfigure emailConfigure={emailConfigure} />
                </Tabs.TabPane>
                }
                {showChat && <Tabs.TabPane tab="Chat" key="3" style={{ padding: '10px' }}>
                    <ChatConfigure chatConfigure={chatConfigure} />
                </Tabs.TabPane>
                }
            </Tabs>
            <Space>
                <Button type="primary">Next</Button>
                <Button type="primary">Previous</Button>
            </Space>
        </div>
    );

}

export default ConfigureChannel;


