import React from 'react';
import Identicon from 'react-identicons';


interface ISideCookieProps {
    id: number,
    cookie: any,
    handleOverOut: any,
    setSelectCookie: any,
    size: number,
    isBlackNWhite: boolean,
    calculateSize: Function,

}
const getDateDecorator = (type, value, size) => {
    const squareSize = size * 0.1;
    const halfSquare = squareSize / 2;
    switch (type) {
        case "SESSION":
            return <div style={{ position: "absolute", width: size, height: squareSize * 2 }}>
                <svg width={size} height={size} >
                    <rect x={(size / 2) - halfSquare} y="0" width={squareSize} height={squareSize} fill="#000000" />
                    <rect x={size / 2 - squareSize - halfSquare} y={squareSize} width={squareSize} height={squareSize} fill="#000000" />
                    <rect x={size / 2 + halfSquare} y={squareSize} width={squareSize} height={squareSize} fill="#000000" />
                    {/* <rect x={size / 2 - halfSquare} y={squareSize * 2} width={squareSize} height={squareSize} fill="#000000" /> */}
                </svg>
            </div>
        // return <div style={{ position: "absolute", width: size, height: size * 0.2, top: "0", backgroundColor: "#000000" }}></div>
        case "EXPIRED":
            return <div style={{ position: "absolute", width: size, height: squareSize * 2 }}>
                <svg width={size} height={size} >
                    <rect x={(size / 2) - halfSquare} y={size - squareSize} width={squareSize} height={squareSize} fill="#49A6A6" />
                    <rect x={size / 2 - squareSize - halfSquare} y={size - squareSize * 2} width={squareSize} height={squareSize} fill="#49A6A6" />
                    <rect x={size / 2 + halfSquare} y={size - squareSize * 2} width={squareSize} height={squareSize} fill="#49A6A6" />
                    {/* <rect x={size / 2 - halfSquare} y={squareSize * 2} width={squareSize} height={squareSize} fill="#000000" /> */}
                </svg>
            </div>
        // return <div style={{ position: "absolute", width: size, height: size * 0.2, top: "0", backgroundColor: "#49A6A6" }}></div>
        case "LIVE":
            return <div style={{ position: "absolute", width: size, height: squareSize * 2 }}>
                <svg width={size} height={size} >
                    <rect x={size - squareSize} y={size / 2 - halfSquare} width={squareSize} height={squareSize} fill="#F23C13" />
                    <rect x={size - squareSize * 2} y={size / 2 - squareSize - halfSquare} width={squareSize} height={squareSize} fill="#F23C13" />
                    <rect x={size - squareSize * 2} y={size / 2 + halfSquare} width={squareSize} height={squareSize} fill="#F23C13" />
                    {/* <rect x={size / 2 - halfSquare} y={squareSize * 2} width={squareSize} height={squareSize} fill="#000000" /> */}
                </svg>
            </div>
        // return <div style={{ position: "absolute", width: size, height: size * 0.2, top: "0", backgroundColor: "#F23C13" }}></div>
        default:
            break;
    }
}

export const SideCookie: React.FC<ISideCookieProps> = ({ id, cookie, handleOverOut, setSelectCookie, size, isBlackNWhite, calculateSize }): JSX.Element => {

    const handleEnter = () => {
        handleOverOut(true);
        setSelectCookie(cookie);
    }

    const dateSize = cookie['expirationDate'] !== undefined ? calculateSize(cookie['expirationDate'] * 1000, size) : { type: "SESSION", val: 0 };
    // const colorDate = dateSize.type !== 'EXPIRED' ? "#F23C13" : "#49A6A6";
    const dateDecorator = cookie['expirationDate'] === undefined ? getDateDecorator("SESSION", 0, size) : getDateDecorator(dateSize.type, dateSize.value, size);

    const tiltClass = cookie['tilt'] ? " cookie-tilt " : "";
    const highlightClass = cookie['highlight'] ? " btn-highlight " : "";
    const selected = cookie['selected'] ? " cookie-selected " : "";

    // console.log('tilt', tilt, tiltClass)

    const identi: JSX.Element = isBlackNWhite ? <Identicon
        string={cookie['name']}
        size={size}
        fg={"#b3b3b3"}
    /> : <Identicon
            string={cookie['name']}
            size={size}
            fg={"#f7931e"}
        />;


    return (
        <div
            key={id}
            className={"sideCookie fade-in " + tiltClass + highlightClass + selected}
            onMouseEnter={() => handleEnter()}
            onMouseOut={() => handleOverOut(false)}
            style={{ width: size, height: size, position: "relative" }}
        >


            {dateDecorator}
            <div>
                {identi}
            </div>
        </div>
    )
}