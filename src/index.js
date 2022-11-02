import { Router } from "@gatsbyjs/reach-router";
import { Amplify } from 'aws-amplify';
import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import awsExports from './aws-exports';
import './gc-components/connect-streams';
import DefaultErrorBoundary from "./gc-components/errorBoundary";
import reportWebVitals from "./gc-components/reportWebVitals";
import Suspence from "./suspence";


const AgentApp = React.lazy(() => import('./agent_app/'));
const OnboardAddIndexPage = React.lazy(() => import('./onboarding'));
const LandingPage = React.lazy(() => import('./landing_page'));

const root =  document.getElementById("root");

Amplify.configure(awsExports);


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Suspence />}>
      <DefaultErrorBoundary>
        <Router basepath="/">
          <AgentApp path="/*" />
          <AgentApp path="/agent/*" />
          <LandingPage path="/site/*" />
          <OnboardAddIndexPage path="/signup/*" />
        </Router>
      </DefaultErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  root
);

reportWebVitals();





