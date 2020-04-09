import React from 'react';
import { Layout, Form, Input, Icon, Menu, Row, Col, Tooltip } from 'antd';
import { getActiveElements } from '../services/menu.logic'

const { Header } = Layout;

interface IMainMenuOwnProps {
    handleSubmit: any,
    getFieldDecorator: Function,
    isURLValid: boolean,
    menuItems: Object[]
    handleClick: Function
    cookieVizActive: boolean
}

export const MainMenu: React.FC<IMainMenuOwnProps> = ({ handleSubmit, getFieldDecorator, isURLValid, menuItems, handleClick, cookieVizActive }): JSX.Element => {


    const items = menuItems.map((item, index) => {
        return <Menu.Item key={index + 1} disabled={item['disabled']}>
            <Tooltip placement="bottom" title={item['title']}>
                {item['icon']}
            </Tooltip>
        </Menu.Item>
    })

    const handleMenuClick = (e) => {
        const menuItem = menuItems.find(item => item['id'] === e['key'])
        handleClick(menuItem['name'], !menuItem['selected'])
    }

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '40px', lineHeight: '40px', padding: '0 10px' }}>
            <Row type="flex" justify="space-between" align="top">
                <Col span={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            {
                                getFieldDecorator('url', {})(

                                    <Input
                                        prefix={<Icon type={isURLValid ? "cloud" : "ban"}
                                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Url"
                                        disabled={cookieVizActive}
                                    />
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
                        style={{ lineHeight: '40px', display: 'flex', justifyContent: 'flex-end' }}
                        onClick={handleMenuClick}
                    >
                        {items}
                    </Menu>
                </Col>
            </Row>
        </Header >
    );
}