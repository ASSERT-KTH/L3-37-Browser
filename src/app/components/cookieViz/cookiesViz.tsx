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
const orderArr: Array<ITypeCookie> = [{ id: 0, name: "TYPE", tittle: "Type of cookie" }, { id: 1, name: "NAME", tittle: "Cookie name" }, { id: 2, name: "DATE", tittle: "Expiration date" }, { id: 3, name: "DOMAIN", tittle: "Cookie domain" }];
const urlOrderArr: Array<ITypeCookie> = [{ id: 0, name: "TYPE_DOMAIN", tittle: "Type of domain" }, { id: 1, name: "DOMAIN", tittle: "Domain name" }]



export const CookiesViz: React.FC<ICookiesVizProps> = ({ userCookies, height, width, marginTop, currentURL, calculateSize }): JSX.Element => {
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);
    const [typeCookie, setTypeCookie] = useState(dataArr[0]);
    const [orderSelected, setOrderSelected] = useState(orderArr[0]);
    const [urlOrderSelected, setUrlOrderSelected] = useState(urlOrderArr[0]);
    const [selectedCookies, setSelectedCookies] = useState([])
    useEffect(() => {
        //update the selected cookies everytime it changes
        // const urls = upDateSelected(selectedCookies, [...vizUrls]);
        // setVizUrls(urls);
    }, [selectedCookies])
    const [vizCookies, setVizCookies] = useState(userCookies);
    useEffect(() => {
        //identify if user cookies change and modify 
        // setValues();
    }, [userCookies])

    const [vizUrls, setVizUrls] = useState(getNonRepeatUrls(userCookies))
    useEffect(() => {
        // setValues();
    }, [typeCookie]);

    // const totalCookies = userCookies.length;
    const firstCookies = vizCookies.filter(el => el['type'] === 'FIRST_PARTY').length;
    const thirdCookies = vizCookies.length - firstCookies;

    //
    const setValues = () => {
        const filtCookies = getCookies(userCookies, currentURL, typeCookie['name'])
        setVizCookies(filtCookies);
        //change urls depending on type
        setVizUrls(getNonRepeatUrls(filtCookies))
    }

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

    //Modify order for URLS
    const handleUrlOrderMenuClick = (e) => {
        const orderedUrls = orderBy(urlOrderArr[Number(e['key'])]['name'], [...vizUrls])
        setUrlOrderSelected(urlOrderArr[Number(e['key'])]);
        setVizUrls(orderedUrls);
    }


    const handleHoverURL = (id, domain, origin, type) => {
        //identify type of URL
        const urlsTilted = tiltUrls([...vizUrls], id, domain, origin, type);
        // const cookiesTilted = tiltCookies([...vizCookies], id, domain, origin, type)
        setVizUrls(urlsTilted);
        // setVizCookies(cookiesTilted);
    }

    const handleMouseOut = () => {
        const urls = restoreTilt([...vizUrls]);
        // const cookies = restoreTilt([...vizCookies]);
        setVizUrls(urls);
        // setVizCookies(cookies);
    }

    const handleClick = (cookie) => {
        if (existInSelected(cookie, selectedCookies)) {
            const cookies = removeCookie(cookie, [...selectedCookies]);
            setSelectedCookies(cookies);

        } else {
            setSelectedCookies([...selectedCookies, cookie]);
        }
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
                />

            </Row>
            {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} position={"right"} /> : <></>}
        </div>
    )
} 