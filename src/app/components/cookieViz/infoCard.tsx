import React from 'react';
import { Card } from 'antd';
import Identicon from 'react-identicons';
import moment from 'moment';
import { truncateString } from '../../services/actions';

interface IInfoCardProps {
    cookie: object,
    position: string,
}

export const InfoCard: React.FC<IInfoCardProps> = ({ cookie, position }): JSX.Element => {
    const expirationDate = cookie['expirationDate'] === undefined ? 'Session cookie: when browser is closed' : moment(cookie['expirationDate'] * 1000).fromNow();
    // const expirationDate = cookie['expirationDate'] === undefined ? 'Session cookie: expires when the user closes the Web browser' : moment(cookie['expirationDate'] * 1000).diff(moment(), 'days');;

    const pos = position === "right" ? "card-right" : "card-left";
    const originData = cookie['origin'] !== undefined && cookie['origin'] !== '' ? (
        <div>
            <div className="spacer-h" />
            <div className="card-info">
                <span>Origin</span>
                <h3>{cookie['origin']}</h3>
            </div>
        </div>
    ) : <React.Fragment></React.Fragment>

    const value = truncateString(cookie['value'], 18);

    return (
        <Card
            style={{ width: 300 }}

            id="cookieInfoCard"
            className={pos}
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "150", alignContent: "center" }}>
                <Identicon
                    string={cookie['name']}
                    size={150}
                    fg={cookie['type'] === 'FIRST_PARTY' ? "#f7931e" : "#b3b3b3"}
                />
            </div>
            <div style={{ height: "15px" }} />
            <div className="card-info name">
                <h3>{cookie['name']}</h3>
            </div>
            <div className="card-info">
                <span>Type</span>
                <div style={{ display: "flex" }}>
                    <svg height="20" width="20">
                        <circle cx="14" cy="15" r="5" fill={cookie['type'] === 'FIRST_PARTY' ? "#f7931e" : "#b3b3b3"} />
                    </svg>
                    <div style={{ width: "10px" }} />
                    <h3>

                        {cookie['type'] === "FIRST_PARTY" ? 'First party' : 'Third party'} cookie
                </h3>
                </div>

            </div>
            <div className="spacer-h" />
            <div className="card-info">
                <span>Domain</span>
                <h3>{cookie['domain']}</h3>
            </div>
            {originData}
            <div className="spacer-h" />
            <div className="card-info">
                <span>Expiration date</span>
                <h3>{expirationDate}</h3>
            </div>
            <div className="spacer-h" />
            <div className="card-info">
                <span>Value</span>
                <h3>{value}</h3>
            </div>

        </Card >
    )
}