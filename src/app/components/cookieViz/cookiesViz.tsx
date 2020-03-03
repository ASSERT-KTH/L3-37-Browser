import React, { useState } from 'react';
import { Dropdown, Menu, message, Row, Col } from 'antd';
import { HorizontalCookies } from './horizontalCookies';
import { InfoCard } from './infoCard';

interface ICookiesVizProps {
    userCookies: [],
    height: number,
    width: number,
    marginTop: number,
    marginLeft: number
}

interface IDateMenu {
    id: number,
    name: string,
    tittle: string
}

const dattArr: Array<IDateMenu> = [{ id: 0, name: "ALL_ITEMS", tittle: "All items" }, { id: 1, name: "DAY", tittle: "Day" }, { id: 2, name: "WEEK", tittle: "Week" }, { id: 3, name: "MONTH", tittle: "Month" }, { id: 4, name: "YEAR", tittle: "Year" }]

export const CookiesViz: React.FC<ICookiesVizProps> = ({ userCookies, height, width, marginTop, marginLeft }): JSX.Element => {
    const [typeDate, setTypeDate] = useState("All items")
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [showInfoCard, setInfoCard] = useState(true);

    const handleMenuClick = (e) => {
        setTypeDate(dattArr[Number(e['key'])]['tittle']);
        message.info('Click on ' + typeDate);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {dattArr.map(item => <Menu.Item key={item['id']}>
                {item['tittle']}
            </Menu.Item>)}

        </Menu>
    );

    return (
        <div id="cookieViz" style={{ width: width, height: height - marginTop }}>
            <Row className="full-width">
                <Col span={24}>
                    <Dropdown.Button overlay={menu} >
                        View by <b>{typeDate}</b>
                    </Dropdown.Button>
                </Col>
                <HorizontalCookies cookies={userCookies} handleOverOut={setInfoCard} setSelectCookie={setSelectedCookie} />

            </Row>
            {showInfoCard && selectedCookie !== null ? <InfoCard cookie={selectedCookie} position={"right"} /> : <></>}
        </div>
    )
} 