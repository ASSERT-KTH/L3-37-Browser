import React, { useState, useEffect } from 'react';
import { Row, Col, message, Button } from 'antd';
import { HorizontalCookies } from './horizontalCookies';
import { InfoCard } from './infoCard';


interface ICookiesVizProps {
    userCookies: [],
    height: number,
    width: number,
    marginTop: number,
    currentURL: string
}

interface ITypeCookie {
    id: number,
    name: string,
    tittle: string
}



const infoHeight: number = 40;
const dataArr: Array<ITypeCookie> = [{ id: 0, name: "CURRENT_URL", tittle: "Current URL cookies" }, { id: 1, name: "ALL_URLS", tittle: "All cookies" }] //, { id: 2, name: "UNDER_VIGILANCE", tittle: "Under vigilance cookies" }
const orderArr: Array<ITypeCookie> = [{ id: 0, name: "TYPE", tittle: "Type of cookie" }, { id: 1, name: "NAME", tittle: "Cookie name" }, { id: 2, name: "DATE", tittle: "Expiration date" }, { id: 3, name: "DOMAIN", tittle: "Cookie domain" }];

const getNonRepeatUrls = (cArr) => {
    //change to strings
    const nonRepeat = cArr.map(cookie => cookie['domain']);
    //sort string array and remove duplicates
    const nonRepeatcookies = nonRepeat.sort().reduce((a, e) => e === a[a.length - 1] ? a : (a.push(e), a), [])
    //map and apply JSX 
    const allUrls = nonRepeatcookies.map((cookie, index) => <Button key={index} type="dashed" shape="round" size='large'>{cookie}</Button>)
    return allUrls;
}

const getCookiesWithURL = (cookieArr, url) => {
    return cookieArr.filter(el => {
        return ((el['type'] === 'FIRST_PARTY' && url.includes(el['domain'])) || (el['origin'].includes(url) && el['type'] === 'THIRD_PARTY'))
    });
}

const getCookies = (cookieArr, urlStr, displayType) => {
    switch (displayType) {
        case 'CURRENT_URL':
            const url = urlStr.replace('http://', '').replace('https://', '').replace('www', '').replace(/.$/, "")
            return getCookiesWithURL(cookieArr, url)
        case 'ALL_URLS':
            return cookieArr;
        case 'UNDER_VIGILANCE':
            console.log(displayType);
            break;

        default:
            console.log('GET COOKIES DEFAULT')
            break;
    }
}

const orderBy = (orderType, arr) => {
    switch (orderType) {
        case "TYPE":
            return arr.sort(function (a) {
                return a['type'] === "FIRST_PARTY" ? -1 : 1;
            });
        case "NAME":
            return arr.sort(function (a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
        case "DATE":
            console.log(orderType);
            return arr.sort(function (a, b) {
                var nameA = a.expirationDate; // ignore upper and lowercase
                var nameB = b.expirationDate; // ignore upper and lowercase
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
        case "DOMAIN":
            console.log(orderType);
            return arr.sort(function (a, b) {
                var nameA = a.domain.toUpperCase(); // ignore upper and lowercase
                var nameB = b.domain.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            }); default:
            break;
    }
}


export const CookiesViz: React.FC<ICookiesVizProps> = ({ userCookies, height, width, marginTop, currentURL }): JSX.Element => {
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);
    const [typeCookie, setTypeCookie] = useState(dataArr[0]);
    const [orderSelected, setOrderSelected] = useState(orderArr[0])
    const [vizCookies, setVizCookies] = useState(userCookies);
    useEffect(() => {
        //identify if user cookies change and modify 
        setValues();
    }, [userCookies])
    const [vizUrls, setVizUrls] = useState(getNonRepeatUrls(userCookies))
    useEffect(() => {
        setValues();
    }, [typeCookie]);

    const totalCookies = userCookies.length;
    const firstCookies = vizCookies.filter(el => el['type'] === 'FIRST_PARTY').length;
    const thirdCookies = vizCookies.length - firstCookies;

    const setValues = () => {
        const filtCookies = getCookies(userCookies, currentURL, typeCookie['name'])
        setVizCookies(filtCookies);
        //change urls depending on type
        setVizUrls(getNonRepeatUrls(filtCookies))
    }

    const handleMenuClick = (e) => {
        setTypeCookie(dataArr[Number(e['key'])]);
        message.info('View: ' + dataArr[Number(e['key'])]['tittle']);
    }

    const handleOrderMenuClick = (e) => {
        const orderedCookies = orderBy(orderArr[Number(e['key'])]['name'], vizCookies)
        setOrderSelected(orderArr[Number(e['key'])]);
        setVizCookies(orderedCookies)
    }

    return (
        <div id="cookieViz" style={{ width: width, height: height - marginTop, padding: '20px 0 0 20px' }}>

            <Row className="full-width">
                <Col span={18} style={{ height: infoHeight }}>
                    <div className="d-flex" >
                        <div className="spacing-h x-small" />
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
                <Col span={6}></Col>
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
                />

            </Row>
            {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} position={"right"} /> : <></>}
        </div>
    )
} 