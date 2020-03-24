import React from 'react';
import { Col, Button, Dropdown, Menu, message } from 'antd';
import { SideCookie } from './sideCookie'

interface IHorizontalCookiesProps {
    handleOverOut: any,
    setSelectCookie: any,
    height: number,
    dataArr: Array<ITypeCookie>
    handleMenuClick: any,
    vizCookies: [],
    vizUrls: any,
    typeCookie: string,
    orderArr: Array<ITypeCookie>,
    handleOrderClick: any,
    orderSelected: string
}

interface ITypeCookie {
    id: number,
    name: string,
    tittle: string
}


export const HorizontalCookies: React.FC<IHorizontalCookiesProps> = ({ handleOverOut, setSelectCookie, height, dataArr, handleMenuClick, vizCookies, vizUrls, typeCookie, orderArr, handleOrderClick, orderSelected }): JSX.Element => {

    const menuHeight = 40;
    const cookiesHeight = (height - menuHeight) * 0.64;
    const urlHeight = (height - menuHeight) * 0.36;


    const menu = (
        <Menu onClick={handleMenuClick}>
            {dataArr.map(item => <Menu.Item key={item['id']}>
                {item['tittle']}
            </Menu.Item>)}
        </Menu>
    );

    const orderMenu = (<Menu onClick={handleOrderClick}>
        {orderArr.map(item => <Menu.Item key={item['id']}>
            {item['tittle']}
        </Menu.Item>)}
    </Menu>);

    const allCookies = vizCookies.map((cookie, index) => <SideCookie
        key={index}
        id={index}
        cookie={cookie}
        handleOverOut={handleOverOut}
        setSelectCookie={setSelectCookie}
        size={50}
        isBlackNWhite={cookie['type'] !== 'FIRST_PARTY'}
    />)





    return (
        <React.Fragment>
            <Col id="horizontalCookies" span={24} style={{ height: cookiesHeight }}>
                {allCookies}
            </Col>
            <Col id="cookiesFilter" span={24} style={{ height: menuHeight }}>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <Button>{"View: " + typeCookie}</Button>
                </Dropdown>
                <div className="spacing-h x-small" />
                <Dropdown overlay={orderMenu} placement="bottomCenter">
                    <Button>{"Order Cookies by: " + orderSelected}</Button>
                </Dropdown>
            </Col>
            <Col id="horizontalURLS" span={24} style={{ height: urlHeight }}>
                {vizUrls}
            </Col>
        </React.Fragment>

    )
}