import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Layout, Typography } from 'antd';
const { Header, Content, Footer } = Layout;
import './assets/style/index.less';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import '../../gc-components/connect-streams';

import logo from '../dashboard/assets/images/new-big-logo.png'
import { navigate } from '@gatsbyjs/reach-router';


const AgentLoginPage = () => {
    const loginContainer = useRef(null);
    const connectUrl = "https://p3fusion-uat.my.connect.aws/ccp-v2"
    const masterTopics = {
        "LOGIN_POPUP": "connect::loginPopup",
        "SEND_LOGS": "connect::sendLogs",
        "SOFTPHONE": "connect::softphone",
        "RINGTONE": "connect::ringtone",
        "METRICS": "connect::metrics"
    }
    const loginOptions = {
        autoClose: true,
        height: 600,
        width: 400,
        top: 80,
        right: 100
    }

    useEffect(() => {
        if (loginContainer.current) {
            connect.agentApp.initCCP(loginContainer.current, {
                ccpUrl: connectUrl,
                loginPopup: true,
                loginPopupAutoClose: true,
                loginOptions: {
                    autoClose: true,
                    height: 600,
                    width: 400,
                    top: 80,
                    right: 100
                },
                region: "us-east-1",
                softphone: {
                    allowFramedSoftphone: true,
                    disableRingtone: false,
                    ringtoneUrl: "./ringtone.mp3"
                },
                pageOptions: {
                    enableAudioDeviceSettings: false,
                    enablePhoneTypeSettings: true
                },

            });
            initializeLogin()
        }


        console.log("::AgentLoginPage Rerendering::");
    }, [connect.agent.initialized])

    const initializeLogin = () => {
        const snapshot = setInterval(() => {
            
            if (connect.agent.initialized) {
                console.log("::Success::");
                navigate("/")

            } else {
                console.log("opening login popup ");
                connect.core.getPopupManager().clear(masterTopics.LOGIN_POPUP);
                connect.core.getPopupManager().open(connectUrl, masterTopics.LOGIN_POPUP, loginOptions)
                AuthStatus()
                clearInterval(snapshot);
            }

        }, 1000)
    }

    const AuthStatus = () => {
        const snapshot = setInterval(() => {
            console.log(  connect.agentApp.isInitialized((a)=>console.log(a)));
            console.log("::Polling for auth status::");
            if (connect.agent.initialized) {
                console.log("::Success::");
                navigate("/")
                clearInterval(snapshot);
            }
        }, 1000)
    }

    return (
        <Layout className="layout loginpage">

            <div className='container'>
                <div className='logo'><img src={logo} width={300} /></div>
                <div className='desc'>
                    <Typography.Title italic level={3}>Please Login to continue</Typography.Title>
                    <Typography.Title level={5}>Enter your username and password on the Amazon connect popup windows</Typography.Title>
                </div>
                <div></div>
                <div className="containerDiv" ref={loginContainer} />

            </div>



        </Layout>
    )
}

export default AgentLoginPage