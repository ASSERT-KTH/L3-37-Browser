import React from 'react';
import { Card } from 'antd';

interface IInfoCardProps {
    cookie: object,
}

export const InfoCard: React.FC<IInfoCardProps> = ({ cookie }): JSX.Element => {


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
        >
            <h3>{cookie['name']}</h3>
            <div>{cookie['domain']}</div>
            <div>{cookie['expirationDate']}</div>
            <div>{cookie['value']}</div>

        </Card>
    )
}