import React from 'react';
import { Card } from 'antd';
import Identicon from 'react-identicons';
import moment from 'moment';

interface IInfoCardProps {
    cookie: object,
    position: string,
}

export const InfoCard: React.FC<IInfoCardProps> = ({ cookie, position }): JSX.Element => {
    const expirationDate = cookie['expirationDate'] === undefined ? 'Session cookie: expires when the user closes the Web browser' : moment(cookie['expirationDate'] * 1000).fromNow();
    // const expirationDate = cookie['expirationDate'] === undefined ? 'Session cookie: expires when the user closes the Web browser' : moment(cookie['expirationDate'] * 1000).diff(moment(), 'days');;

    const pos = position === "right" ? "card-right" : "card-left";
    const originData = cookie['origin'] !== undefined ? <div className="card-info">
        <span>Origin</span>
        <h3>{cookie['origin']}</h3>
    </div> : <React.Fragment></React.Fragment>
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <Identicon
                    string={cookie['name']}
                    size={200}
                    fg={cookie['type'] === 'FIRST_PARTY' ? "#f7931e" : "#b3b3b3"}
                />
            }
            id="cookieInfoCard"
            className={pos}
        >
            <div className="card-info">
                <span>Name</span>
                <h3>{cookie['name']}</h3>
            </div>
            <div className="card-info">
                <span>Type</span>
                <h3>{cookie['type']}</h3>
            </div>
            <div className="card-info">
                <span>Domain</span>
                <h3>{cookie['domain']}</h3>
            </div>
            {originData}
            <div className="card-info">
                <span>Days to expire</span>
                <h3>{expirationDate}</h3>
            </div>
            <div className="card-info">
                <span>Value</span>
                <h3>{cookie['value']}</h3>
            </div>

        </Card >
    )
}