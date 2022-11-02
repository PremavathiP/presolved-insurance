import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth, Hub } from "aws-amplify";
import { Authenticator, Button, Flex, Heading, ThemeProvider, View } from '@aws-amplify/ui-react';
import { updateUser } from '../store/reducers/user';
import { navigate } from '@gatsbyjs/reach-router';

import logo from '../assets/images/logo.png'
import '@aws-amplify/ui-react/styles.css';
import '../assets/style/index.less'
const OnboardClientSignupPage = () => {
    
    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoggedin: false,
        user: null
    })

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((login) => {
            setState({ ...state, isLoggedin: true })
            const loginData = login?.attributes
            
            dispatch(updateUser({ ...loginData }))
            navigate("/signup/onboard")
        }).catch((ex)=>{
            console.info("No auth data available")
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
        <section className="client-signuppage">
            <div className='container'>
                <div className='logo'>
                    <img src={logo} height={50} />
                </div>
                <div className='cognito'>
                    <Authenticator >
                        {({ signOut }) => (
                            <main>
                                <Heading level={2}>Please wailt while we load the page . . .</Heading>
                                <Button onClick={signOut} isFullWidth={true} variation="primary" size="large" loadingText="">Sign out</Button>
                            </main>
                        )}
                    </Authenticator>
                </div>
            </div>
        </section>
    )
}

export default OnboardClientSignupPage