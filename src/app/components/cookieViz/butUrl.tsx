import React from 'react';
import { Tooltip } from 'antd';

import { truncateString } from '../../services/actions';
import { createArc } from '../../services/vix.cookies.actions';

interface IbutURLPROPS {
    id: number,
    cookie: object,
    handleHoverURL: Function,
    handleMouseOut: Function,
    handleClick: Function,
    totalCookies: number
}


export const ButURL: React.FC<IbutURLPROPS> = ({ id, cookie, handleHoverURL, handleMouseOut, handleClick, totalCookies }): JSX.Element => {

    const handleEnter = (e) => {
        handleHoverURL(id, cookie['domain'], cookie['origin'], cookie['type']);
    }

    const handleMouseLeave = (e) => {
        handleMouseOut();
    }

    const handleClickElement = (e) => {
        handleClick(cookie);
    }



    const tiltClass = cookie['tilt'] ? " btn-tilt " : "";
    const highlightClass = cookie['highlight'] ? " btn-highlight " : "";
    const selected = cookie['selected'] ? " btn-selected " : "";

    const arcs = createArc([cookie['numCookies']['first'], cookie['numCookies']['thrid']], 14).map((el, index) => {
        return <path
            key={index}
            d={el['path']}
            stroke={index === 0 ? '#f7931e' : '#c4c4c4'}
            fillOpacity='0'
            strokeWidth="6"
        />
    })

    const decorator = <svg height="35" width="35">
        <g transform={`translate(${35 / 2}, ${35 / 2})`}>
            {arcs}
        </g>
    </svg>;

    return (
        <div className={"btn-large " + tiltClass + highlightClass + selected}
            onMouseEnter={handleEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickElement}
        >
            <Tooltip placement="top" title={truncateString(cookie['domain'], 20)}>
                <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                    {decorator}
                </div>
            </Tooltip>
        </div >
    )
}