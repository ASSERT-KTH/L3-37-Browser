import React, { useState } from 'react';
import { Layout, Button, Tooltip } from 'antd';
import { SideCookie } from './sideCookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import { InfoCard } from './infoCard';

const { Sider } = Layout;

interface ICookiesSideProps {
    contentHeight: number,
    cookies: [],
    loading: boolean,
    handleClick: Function,
    horizontalCookieIsActive: boolean,
    calculateSize: Function
}

export const CookiesSideBar: React.FC<ICookiesSideProps> = ({ contentHeight, cookies, loading, handleClick, horizontalCookieIsActive, calculateSize }): JSX.Element => {
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);


    const getCookiesFrom = (arrCookies) => {
        const allCookies = cookies.map((cookie, index) => <SideCookie
            key={index}
            id={index}
            cookie={cookie}
            handleOverOut={setInfoCard}
            setSelectCookie={setSelectedCookie}
            size={10}
            isBlackNWhite={true}
            calculateSize={calculateSize}
        />)
        return <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
            {allCookies}
        </div>
    }

    const handleMenuClick = (e) => { handleClick('COOKIES_HORIZONTAL_VIZ', true) }
    const rotateIcon = !horizontalCookieIsActive ? '' : 'fa-rotate-180';
    const message = !horizontalCookieIsActive ? 'View all cookies' : 'Hide all cookies'
    return (
        <Sider width={45} style={{ marginTop: 40, height: contentHeight, backgroundColor: "white" }} className="site-layout-background" >
            <div id="CookieBar">

                <Tooltip placement="rightTop" title={message}>
                    <Button type="dashed" shape="circle" onClick={handleMenuClick}>
                        <FontAwesomeIcon className={rotateIcon} icon={faAngleDoubleRight} />
                    </Button>
                </Tooltip>
                {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} position={"left"} /> : <></>}
                {loading ? <></> : !horizontalCookieIsActive ? getCookiesFrom(cookies) : <></>}
            </div>
        </Sider >
    )
}