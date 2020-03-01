import React from 'react';

interface ISideCookieProps {
    id: number,
    cookie: any,
    handleOverOut: any,
    setSelectCookie: any,
    size: number
}

export const SideCookie: React.FC<ISideCookieProps> = ({ id, cookie, handleOverOut, setSelectCookie, size }): JSX.Element => {

    const handleEnter = () => {
        handleOverOut(true);
        setSelectCookie(cookie);
    }
    return (
        <div
            key={id}
            className="sideCookie"
            onMouseEnter={() => handleEnter()}
            onMouseOut={() => handleOverOut(false)}
            style={{ width: size, height: size }}
        >

        </div>
    )
}