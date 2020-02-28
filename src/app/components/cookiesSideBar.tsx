import React from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

interface ICookiesSideProps {
    contentHeight: number
}

export const CookiesSideBar: React.FC<ICookiesSideProps> = ({ contentHeight }): JSX.Element => {

    return (
        <Sider width={45} style={{ marginTop: 40, height: contentHeight }} className="site-layout-background" id="CookieBar">
            <h1>hello</h1>
        </Sider>
    )
}