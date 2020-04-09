import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { HorizontalCookies } from './horizontalCookies';
import { InfoCard } from './infoCard';
import { getNonRepeatUrls, getCookies, orderBy, tiltUrls, restoreTilt, existInSelected, upDateSelected, removeCookie } from '../../services/vix.cookies.actions';

interface ICookiesVizProps {
    userCookies: [],
    height: number,
    width: number,
    marginTop: number,
    currentURL: string,
    calculateSize: Function
}

interface ITypeCookie {
    id: number,
    name: string,
    tittle: string
}

const infoHeight: number = 40;

const dataArr: Array<ITypeCookie> = [{ id: 0, name: "CURRENT_URL", tittle: "Current URL cookies" }, { id: 1, name: "ALL_URLS", tittle: "All cookies" }] //, { id: 2, name: "UNDER_VIGILANCE", tittle: "Under vigilance cookies" }
const orderArr: Array<ITypeCookie> = [{ id: 0, name: "NAME", tittle: "Cookie name" }, { id: 1, name: "TYPE", tittle: "Type of cookie" }, { id: 2, name: "DATE", tittle: "Expiration date" }, { id: 3, name: "DOMAIN", tittle: "Cookie domain" }];


export const CookiesViz: React.FC<ICookiesVizProps> = ({ userCookies, height, width, marginTop, currentURL, calculateSize }): JSX.Element => {
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);
    const [typeCookie, setTypeCookie] = useState(dataArr[0]);
    const [orderSelected, setOrderSelected] = useState(orderArr[0]);
    const [selectedCookies, setSelectedCookies] = useState([])
    const [vizCookies, setVizCookies] = useState(userCookies);
    const [vizUrls, setVizUrls] = useState(getNonRepeatUrls(userCookies))

    useEffect(() => {
        const filtCookies = getCookies(userCookies, currentURL, typeCookie['name'])
        setVizCookies(filtCookies);
        //change urls depending on type
        setVizUrls(getNonRepeatUrls(filtCookies))
    }, [typeCookie, currentURL, userCookies]);

    // const totalCookies = userCookies.length;
    const firstCookies = vizCookies.filter(el => el['type'] === 'FIRST_PARTY').length;
    const thirdCookies = vizCookies.length - firstCookies;

    //Modify Amount of cookies
    const handleMenuClick = (e) => {
        setTypeCookie(dataArr[Number(e['key'])]);
        message.info('View: ' + dataArr[Number(e['key'])]['tittle']);
    }

    //Modify order for Cookies
    const handleOrderMenuClick = (e) => {
        const orderedCookies = orderBy(orderArr[Number(e['key'])]['name'], [...vizCookies])
        setOrderSelected(orderArr[Number(e['key'])]);
        setVizCookies(orderedCookies)
    }

    const handleHoverURL = (id, domain, origin, type) => {
        const urlsTilted = tiltUrls([...vizCookies], id, domain, origin, type);
        setVizCookies(urlsTilted);
    }

    const handleMouseOut = () => {
        const urls = restoreTilt([...vizCookies]);
        setVizCookies(urls);
    }

    const handleClick = (cookie) => {
        const cookies = existInSelected(cookie, selectedCookies) ? removeCookie(cookie, [...selectedCookies]) : [...selectedCookies, cookie];
        upDateSelected(cookies, [...vizCookies]);
        setSelectedCookies(cookies);
    }

    return (
        <div id="cookieViz" style={{ width: width, height: height - marginTop, padding: '20px 0 0 20px' }}>

            <Row className="full-width">
                <Col span={24} style={{ height: infoHeight }}>
                    <div className="d-flex" >
                        <svg height="20" width="20">
                            <circle cx="10" cy="10" r="5" fill="#b3b3b3" />
                        </svg>
                        <div>3rd party cookies: {thirdCookies}</div>
                        <div className="spacing-h" />
                        <svg height="20" width="20">
                            <circle cx="10" cy="10" r="5" fill="#f7931e" />
                        </svg>
                        <div>1st party cookies: {firstCookies}</div>
                        <div className="spacing-h" />
                        <div>Total cookies: {thirdCookies + firstCookies}</div>
                    </div>
                </Col>
                <HorizontalCookies
                    handleOverOut={setInfoCard}
                    setSelectCookie={setSelectedCookie}
                    height={height - infoHeight}
                    dataArr={dataArr}
                    handleMenuClick={handleMenuClick}
                    vizCookies={vizCookies}
                    vizUrls={vizUrls}
                    typeCookie={typeCookie['tittle']}
                    orderArr={orderArr}
                    handleOrderClick={handleOrderMenuClick}
                    orderSelected={orderSelected['tittle']}
                    calculateSize={calculateSize}
                    handleHoverURL={handleHoverURL}
                    handleMouseOut={handleMouseOut}
                    handleClick={handleClick}
                    totalCookies={thirdCookies + firstCookies}
                />

            </Row>
            {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} position={"right"} /> : <></>}
        </div>
    )
} 