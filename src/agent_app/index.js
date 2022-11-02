import { Router } from "@gatsbyjs/reach-router";
import React from "react";
import { Provider } from 'react-redux';
import AgentLoginPage from "./agent_login";
import DashboardIndexPage from "./dashboard";
import '../gc-components/connect-streams';
import { store } from './store';
import AppAuthLoginPage from "./user_login";



const AgentAppindexPage = () => {
    return (
        <Provider store={store}>
            <Router>
                <DashboardIndexPage path="/*" />
                <AgentLoginPage path="/login/*" />
                <AppAuthLoginPage path="/applogin/*" />
            </Router>
        </Provider>
    )
}

export default AgentAppindexPage