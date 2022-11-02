import { Steps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import SelectAccount from './selectAccount';
import ChooseChannel from './chooseChannel';

import ConfigureCases from './configureCases';
import Review from './review';

const { Step } = Steps;

const OnBoardSteps = () => {

  const [state, setState] = useState({
    current: 0,
    accounts: [
      { label: 'Self Managed AWS account', value: 0 },
      { label: 'Presolved Managed AWS account', value: 1 }
    ],
    accountType: null,
    channel: {
      isPhoneSelected: true,
      isEmailSelected: false,
      isChatSelected: false,
      phone: {
        numberType:"existing",
        isnew:false,
        new:"tfn",        
        phoneNumberOptions: [
          { label: 'Use my old phone number', value: 'oldNumber' },
          { label: 'Allocate new number', value: 'newNumber' }
        ],
        phoneNumberSubOptions: [
          { label: 'TFN', value: 'TFN' },
          { label: 'DID', value: 'DID' }
        ]
      },
      email: {},
      chat: {},

    },
    step1: {},
    step2: {},

  })

  const next = () => setState({ ...state, current: state.current + 1 });
  const prev = () => setState({ ...state, current: state.current - 1 });
  const onChange = (value) => setState({ ...state, current: value });

  const steps = [
    {
      title: 'Select Account',
      content: <SelectAccount state={state} setState={setState} next={next} />,
    },
    {
      title: 'Choose channel',
      content: <ChooseChannel state={state} setState={setState} next={next} prev={prev} />,
    },
    {
      title: 'Configure cases',
      content: <ConfigureCases state={state} setState={setState} next={next} prev={prev}  />,
    },
    {
      title: 'Review',
      content: <Review />,
    },
  ];


  return (
    <Content className='Steps' >
      <Steps current={state.current} onChange={onChange} >
        {steps.map((item, index) => <Step key={index} title={item.title} />)}
      </Steps>
      <div className="steps-content" style={{ margin: '50px 3px 50px 3px' }}>{steps[state.current].content}</div>
    </Content>
  );
};
export default OnBoardSteps;