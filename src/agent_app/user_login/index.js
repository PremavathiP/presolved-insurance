import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { navigate } from '@gatsbyjs/reach-router';
import { Auth, Hub } from "aws-amplify";
import { Authenticator, Button, Flex, Heading, ThemeProvider, View } from '@aws-amplify/ui-react';

import './assets/style/index.less';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import '@aws-amplify/ui-react/styles.css';
import logo from '../dashboard/assets/images/new-big-logo.png'
import { updateAppUser } from '../store/reducers/user';


 


const AppAuthLoginPage = () => {

    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoggedin: false,
        user: null
    })

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((login) => {
            setState({ ...state, isLoggedin: true })
            const loginData = login?.attributes
            dispatch(updateAppUser({ ...loginData }))
            navigate("/")
        })
    }, [state.isLoggedin])

    Hub.listen('auth', (data) => {
        const event = data.payload.event;
        console.log({ event });
        if (event === 'signIn') {
            setState({ ...state, isLoggedin: true })
        }
    });


    return (
        <Layout className="layout loginpage">

            <div className='container'>
                <div className='logo'><img src={logo} width={300} /></div>
                <Authenticator >
                    {({ signOut }) => (
                        <main>
                            <Heading level={2}>Please wailt while we load the page . . .</Heading>
                            <Button onClick={signOut} isFullWidth={true} variation="primary" size="large" loadingText="">Sign out</Button>
                        </main>
                    )}
                </Authenticator>
            </div>
        </Layout>
    )
}

export default AppAuthLoginPage