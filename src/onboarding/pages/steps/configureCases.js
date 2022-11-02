import { Col, Row,Typography,Divider } from 'antd';
import React from 'react';
import CreateNewTemplate from '../../../agent_app/dashboard/task_builder/newTemplate';
import ils1 from '../../assets/images/illustrations/signup-5.svg';
const ConfigureCases = () => {


    return (
        <div className='template-section'>
            <Row>
                <Col span={6}>
                    <img src={ils1} className="sideimg" />
                    </Col>
                <Col span={18}>
                <Typography.Title level={3}>Create Task Templates</Typography.Title>
                    <Divider />
                    <CreateNewTemplate location={{
                        "state": {
                            id: null,
                            edit: false,
                            record: {}
                        }
                    }} />

                </Col>
            </Row>

        </div>
    );
};

export default ConfigureCases;