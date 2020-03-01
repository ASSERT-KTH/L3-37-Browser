import React from 'react';
import { Layout, Form, Input, Icon, Menu, Row, Col } from 'antd';
import { getActiveElements } from '../services/menu.logic'

const { Header } = Layout;

interface IMainMenuOwnProps {
    handleSubmit: any,
    getFieldDecorator: Function,
    isURLValid: boolean,
    menuItems: Object[]
    handleClick: Function
}

export const MainMenu: React.FC<IMainMenuOwnProps> = ({ handleSubmit, getFieldDecorator, isURLValid, menuItems, handleClick }): JSX.Element => {


    const items = menuItems.map((item, index) => {
        return <Menu.Item key={index + 1}> <Icon type={item['icon']} title={item['title']} onClick={(event) => handleClick(item['name'], !item['selected'])} /></Menu.Item>
    })

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
                        {items}
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
}