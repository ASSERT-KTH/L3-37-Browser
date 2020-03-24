import React from 'react';
import Identicon from 'react-identicons'


interface ISideCookieProps {
    id: number,
    cookie: any,
    handleOverOut: any,
    setSelectCookie: any,
    size: number,
    isBlackNWhite: boolean
}

export const SideCookie: React.FC<ISideCookieProps> = ({ id, cookie, handleOverOut, setSelectCookie, size, isBlackNWhite }): JSX.Element => {

    const handleEnter = () => {
        handleOverOut(true);
        setSelectCookie(cookie);
    }

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
            className="sideCookie"
            onMouseEnter={() => handleEnter()}
            onMouseOut={() => handleOverOut(false)}
            style={{ width: size, height: size }}
        >
            {identi}
        </div>
    )
}