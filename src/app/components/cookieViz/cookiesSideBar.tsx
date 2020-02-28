import React, { useState } from 'react';
import { Layout, Button, Tooltip, Icon } from 'antd';
import { SideCookie } from './sideCookie';
import { getCookiesFrom } from '../../services/cookies';
import { InfoCard } from './infoCard';

const { Sider } = Layout;

interface ICookiesSideProps {
    contentHeight: number,
    cookies: []
    loading: boolean
}

export const CookiesSideBar: React.FC<ICookiesSideProps> = ({ contentHeight, cookies, loading }): JSX.Element => {
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);

    const getCookiesFrom = (arrCookies) => {
        const allCookies = cookies.map((cookie, index) => <SideCookie id={index} cookie={cookie} handleOverOut={setInfoCard} setSelectCookie={setSelectedCookie} />)
        return <div style={{ display: 'flex', flexFlow: 'wrap' }}>
            {allCookies}
        </div>
    }

    return (
        <Sider width={45} style={{ marginTop: 40, height: contentHeight }} className="site-layout-background" id="CookieBar">
            <Tooltip placement="rightTop" title="View all cookies">
                <Button type="primary" shape="circle" >
                    <Icon type="smile" theme="twoTone" title="Sound Viz" />
                </Button>
            </Tooltip>
            {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} /> : <></>}
            {loading ? <></> : getCookiesFrom(cookies)}
        </Sider >
    )
}