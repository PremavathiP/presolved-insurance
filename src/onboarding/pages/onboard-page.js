import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import OnBoardHeader from '../layout/header';
import { Content } from 'antd/lib/layout/layout';
import OnBoardSteps from './steps/steps';
import { useSelector } from 'react-redux';
import { navigate } from '@gatsbyjs/reach-router';
import '../assets/style/index.less';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
const OnBoardPage = () => {

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user.isLoggedin) {
      navigate("/signup")
    }
  }, []);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <section className='onboard-page'>
      <Layout className='onboard-page'>

        <Layout className="site-layout">
          <OnBoardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
          <Content className="main-onboard-page" >
            <div className="site-layout-background">
              <OnBoardSteps />
            </div>
          </Content>
        </Layout>
      </Layout>
    </section>
  )
}

export default OnBoardPage