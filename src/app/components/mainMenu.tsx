import React from 'react';
import { Layout, Form, Input, Icon, Menu, Row, Col } from 'antd';
import { getActiveElements } from '../services/menu.logic'

const { Header } = Layout;

interface IMainMenuOwnProps {
    handleSubmit: any,
    getFieldDecorator: Function,
    isURLValid: boolean,
    menuItems: Object[]
}

export const MainMenu: React.FC<IMainMenuOwnProps> = ({ handleSubmit, getFieldDecorator, isURLValid, menuItems }): JSX.Element => {


    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '40px', lineHeight: '40px', padding: '0 10px' }}>
            <Row type="flex" justify="space-between" align="top">
                <Col span={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            {
                                getFieldDecorator('url', {})(
                                    <Input prefix={<Icon type={isURLValid ? "cloud" : "ban"} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Url" />
                                )
                            }
                        </Form.Item>
                    </Form>
                </Col>

                <Col span={10}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        multiple={true}
                        defaultSelectedKeys={['5']}
                        selectedKeys={getActiveElements(menuItems)}
                        style={{ lineHeight: '40px' }}
                    >
                        <Menu.Item key="1"> <Icon type="smile" theme="twoTone" title="Sound Viz" /></Menu.Item>
                        <Menu.Item key="2"><Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" title="Tree Viz" /></Menu.Item>
                        <Menu.Item key="3"> <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" title="Cookies Viz" /></Menu.Item>
                        <Menu.Item key="4"> <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" title="L3-33" /></Menu.Item>
                        <Menu.Item key="5"> <Icon type="global" title="Browser" /></Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
}