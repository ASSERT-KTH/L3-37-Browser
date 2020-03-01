import React, { useState } from 'react';
import { Col, Button } from 'antd';
import { SideCookie } from './sideCookie'


interface IHorizontalCookiesProps {
    cookies: [],
    handleOverOut: any,
    setSelectCookie: any,
}

export const HorizontalCookies: React.FC<IHorizontalCookiesProps> = ({ cookies, handleOverOut, setSelectCookie }): JSX.Element => {
    const allCookies = cookies.map((cookie, index) => <SideCookie key={index} id={index} cookie={cookie} handleOverOut={handleOverOut} setSelectCookie={setSelectCookie} size={100} />)
    const allUrls = cookies.map(cookie => <Button type="primary" shape="round" size='large'>{cookie['domain']}</Button>)

    //CREATE COOKIE INTERFACE
    //CREATE A STATE FOR COOKIES
    //ADD TO THE STATE THE HIGHLIGHT OPTION
    //
    return (
        <React.Fragment>
            <Col id="horizontalCookies" span={24}>
                {allCookies}
            </Col>
            <Col id="horizontalURLS" span={24}>
                {allUrls}
            </Col>
        </React.Fragment>

    )
}