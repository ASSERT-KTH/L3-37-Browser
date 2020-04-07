import React from 'react';
import { truncateString } from '../../services/actions';

interface IbutURLPROPS {
    id: number,
    cookie: object,
    handleHoverURL: Function,
    handleMouseOut: Function,
    handleClick: Function
}


export const ButURL: React.FC<IbutURLPROPS> = ({ id, cookie, handleHoverURL, handleMouseOut, handleClick }): JSX.Element => {
    const handleEnter = (e) => {
        handleHoverURL(id, cookie['domain'], cookie['origin'], cookie['type']);
    }

    const handleMouseLeave = (e) => {
        handleMouseOut();
    }

    const handleClickElement = (e) => {
        handleClick(cookie);
    }


    const decorator = cookie['origin'] === "" ? <svg height="35" width="30">
        <circle cx="15" cy="20" r="14" fill={"#b3b3b3"} />
    </svg> : <svg height="35" width="30">
            <polygon points="1,9 1,33 25,21" fill={"#b3b3b3"} />
        </svg>

    const tiltClass = cookie['tilt'] ? " btn-tilt " : "";
    const highlightClass = cookie['highlight'] ? " btn-highlight " : "";
    const selected = cookie['selected'] ? " btn-selected " : "";
    return (
        <div className={"btn-large " + tiltClass + highlightClass + selected}
            onMouseEnter={handleEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickElement}
        >
            <div>
                {decorator}
            </div>
            <div className="spacer-w" />
            <div>
                {truncateString(cookie['domain'], 20)}
            </div>
        </div>
    )
    // return <Button type="dashed" shape="round" size='large'>{domain}</Button>
}