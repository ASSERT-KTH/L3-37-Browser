import React from 'react';

interface ISideCookieProps {
    id: number,
    cookie: any,
    handleOverOut: any,
    setSelectCookie: any
}

export const SideCookie: React.FC<ISideCookieProps> = ({ id, cookie, handleOverOut, setSelectCookie }): JSX.Element => {

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
        >

        </div>
    )
}