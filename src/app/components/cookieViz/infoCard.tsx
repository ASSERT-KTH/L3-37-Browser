import React from 'react';
import { Card } from 'antd';

interface IInfoCardProps {
    cookie: object,
    position: string,
}

export const InfoCard: React.FC<IInfoCardProps> = ({ cookie, position }): JSX.Element => {

    const pos = position === "right" ? "card-right" : "card-left";
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                <span>Domain</span>
                <h3>{cookie['domain']}</h3>
            </div>
            <div className="card-info">
                <span>Date</span>
                <h3>{cookie['expirationDate']}</h3>
            </div>
            <div className="card-info">
                <span>Value</span>
                <h3>{cookie['value']}</h3>
            </div>

        </Card>
    )
}