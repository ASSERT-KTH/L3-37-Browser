import React from 'react';
import * as d3 from 'd3';
import { Tooltip } from 'antd';


interface Iprops {
    ikey: any,
    name: any,
    x0: any,
    y0: any,
    x1: any,
    y1: any,
    tooltip: boolean,
    mirror: boolean,
    colorTheme: boolean
}

export const TreeElement: React.FC<Iprops> = ({ ikey, name, x0, y0, x1, y1, tooltip, mirror, colorTheme }): JSX.Element => {
    const draw = drawElement(ikey, name, x0, y0, x1, y1, mirror, colorTheme);
    const ele = tooltip ? (
        <Tooltip key={ikey + name} placement="top" title={name} >
            {draw}
        </Tooltip>) : draw;

    return (ele);
}


const drawElement = (key, name, x0, y0, x1, y1, mirror, colorTheme): JSX.Element => {
    const struct = ['header', 'article', 'nav', 'head', 'body', 'footer', 'section', 'table', 'tr', 'center', 'hr', 'br', 'tbody', 'thead', 'ul', 'li', 'ol', 'html', '#document'];
    const items = ['script', 'link'];
    const meta = ['meta'];
    const style = ['style'];
    const title = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'];
    const text = ['span', 'p', 'td', 'th', 'i', 'noscript', 'u', 'b', 'cite'];
    const media = ['img', 'audio', 'video', 'picture'];
    const svg = ["svg", "animate", "animationMotion", "animateTransform", "circle", "clipPath", "color-profile", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvelveMatrix", "feDiffuseLightning", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "FeSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreigObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "solidcolor", "stop", "switch", "symbol", "textPath", "tspan", "use", "view"]
    const form = ['form', 'select', 'input', 'option', 'fieldset'];
    const action = ['a', 'button',];
    const height = y1 - y0;
    const width = x1 - x0 > y1 - y0 ? height : x1 - x0;
    const posY = mirror === false ? y0 : key % 2 === 0 ? y0 * -1 : y0;

    const color = colorTheme ? "" : " dark"
    const colorLine = colorTheme ? "" : " dark-line";
    if (struct.includes(name)) {
        //STRUCTURE GENERAL
        const height = 5;
        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <rect
                    key={key + name}
                    className={`descendants descendants-${name}` + color}
                    x={x0 || 0}
                    y={posY || 0}

                    width={x1 - x0 || 0}
                    height={height || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        );
    } else if (form.includes(name)) {
        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <rect
                    className={colorTheme ? "" : `descendants descendants-${name}-fill` + colorLine}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>

                <rect
                    className={`descendants descendants-${name}-fill` + color}
                    x={x0 || 0}
                    y={posY + height / 3 || 0}
                    width={x1 - x0 || 0}
                    height={height / 3 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>

        )
    } else if (media.includes(name)) {

        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <circle className={`descendants descendants-${name}` + color} cx={x0 + width / 2} cy={posY + height / 2} r={width / 2} />

            </g>

        )


    } else if (svg.includes(name)) {

        const cord = `M ${x0} ${posY} L ${x0} ${posY + height}  L ${x0 + (x1 - x0)} ${posY + height} L ${x0} ${posY}`;

        return (
            <g key={key + name} className={`descendants descendants-svg` + color}>

                <path
                    className={`descendants descendants-svg` + color}
                    d={cord} />
                <rect
                    className={`descendants descendants-svg-line` + colorLine}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        )
    } else if (style.includes(name)) {
        const sqw = width / 3;
        const sqh = height / 3;

        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <rect
                    className={`descendants descendants-${name}-line` + color + colorLine}
                    x={x0 || 0}
                    y={posY || 0}
                    width={width || 0}
                    height={y1 - y0 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-${name}` + color}
                    x={x0 + sqw || 0}
                    y={posY + sqh || 0}
                    width={sqw || 0}
                    height={sqh || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={width || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        )

    } else if (title.includes(name)) {

        const cord = `M ${x0} ${posY} L ${x0 + width / 2} ${posY + height / 2}  L ${x0 + width} ${posY}`;
        const cord2 = `M ${x0} ${posY + height} L ${x0 + width / 2} ${posY + height / 2}  L ${x0 + width} ${posY + height}`;
        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <path d={cord} />
                <path d={cord2} />
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        )

    } else if (text.includes(name)) {

        // const cord = `M ${x0} ${posY} L ${x0 + width / 2} ${posY + height / 2}  L ${x0 + width} ${posY}`;
        const cord2 = `M ${x0} ${posY + height} L ${x0 + width / 2} ${posY + height / 2}  L ${x0 + width} ${posY + height}`;

        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                {/* <path d={cord} /> */}
                <path d={cord2} />

                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        )
    } else if (action.includes(name)) {
        const r = width * 0.2;
        const cord = `M ${x0} ${posY + height / 2} L ${x0 + width / 2} ${posY} V ${posY + height} L ${x0} ${posY + height / 2}`;
        const button = name === 'button' ? <></> : <circle className={`descendants descendants-${name}-link` + color} cx={x1 - r} cy={posY + height / 2} r={r}
        />
        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <path d={cord} />
                <line className={'descendants descendants-line' + colorLine} x1={x0 + width / 2} y1={posY + height / 2} x2={x0 + (x1 - x0)} y2={posY + height / 2} />
                {button}
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        )

    } else if (name === 'link') {
        const arc = d3.arc();
        const transformation = mirror ? `translate(${x0 + width / 2},${-posY}) rotate(${0})` : `translate(${x0 + width / 2},${posY}) rotate(${180})`;

        return (
            <g transform={transformation} key={key + name}>
                <path
                    className={`descendants descendants-${name}` + color}
                    d={arc({
                        innerRadius: 0,
                        outerRadius: width / 2,
                        startAngle: Math.PI / 2,
                        endAngle: -Math.PI / 2
                    })}></path>

                <rect
                    className={`descendants descendants-invisible`}
                    x={0}
                    y={-height}
                    width={x1 - x0 || 0}
                    height={height || 0}
                ></rect>
            </g>

        )
    } else if (items.includes(name)) {
        const arc = d3.arc();
        const transformation = mirror ? `translate(${x0 + width / 2},${posY + height / 2}) rotate(${180})` : `translate(${x0 + width / 2},${posY + height / 2}) rotate(${180})`;

        return (<g transform={transformation} key={key + name} className={`descendants descendants-${name}` + color}>
            <path d={arc({
                innerRadius: 0,
                outerRadius: width / 2,
                startAngle: Math.PI / 2,
                endAngle: -Math.PI / 2
            })}></path>
            <rect
                // className={`descendants descendants-line`}
                width={1 || 0}
                height={height / 2 || 0}
            ></rect>
        </g>

        )
    } else if (name === 'div') {
        //DIV
        const heightX = 2;
        const widthX = 2;
        return (
            <g key={key + name}>
                <rect
                    className={`descendants descendants-${name}` + color}
                    x={x0 || 0}
                    y={posY || 0}
                    rx="5"
                    ry="5"
                    width={widthX || 0}
                    height={y1 - y0 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-${name}` + color}
                    x={x0 || 0}
                    y={posY + ((y1 - y0) / 2) || 0}
                    rx="5"
                    ry="5"
                    width={x1 - x0 || 0}
                    height={heightX || 0}
                ></rect>
                <rect
                    className={`descendants descendants-${name}` + color}
                    x={x1 - widthX || 0}
                    y={posY || 0}
                    rx="5"
                    ry="5"
                    width={widthX || 0}
                    height={y1 - y0 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>
            </g>
        );
    } else if (meta.includes(name)) {
        // META
        const sqw = width / 3;
        const sqh = height / 3;

        return (
            <g key={key + name}>
                <circle
                    className={`descendants descendants-${name}` + color}
                    cx={x0 + width / 2}
                    cy={posY > 0 ? (y0 + height / 2) : (y0 - height / 2) * -1}
                    r={width * 0.05}
                />
                <line className={`descendants descendants-${name}-line` + colorLine} x1={x0 + sqw} y1={posY + sqh} x2={x0 + sqw + sqw / 2} y2={posY} />
                <line className={`descendants descendants-${name}-line` + colorLine} x1={x0 + 2 * sqw} y1={posY + sqh} x2={x0 + sqw + sqw / 2} y2={posY} />
                <line className={`descendants descendants-${name}-line` + colorLine} x1={x0 + sqw} y1={posY + sqh * 2} x2={x0 + sqw + sqw / 2} y2={posY + height} />
                <line className={`descendants descendants-${name}-line` + colorLine} x1={x0 + 2 * sqw} y1={posY + height - sqh} x2={x0 + sqw + sqw / 2} y2={posY + height} />
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    rx="15"
                    ry="15"
                    width={width || 0}
                    height={height || 0}
                ></rect>
            </g>

        )
    } else {
        //DEFAULT
        return (
            <g key={key + name} className={`descendants descendants-${name}` + color}>
                <rect
                    className={`descendants descendants-unknown` + color}
                    x={x0 || 0}
                    y={posY || 0}
                    width={x1 - x0 || 0}
                    height={(y1 - y0) / 2 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-unknown-line` + colorLine}
                    x={x0 || 0}
                    y={(posY) + (y1 - y0) / 2 || 0}
                    width={x1 - x0 || 0}
                    height={(y1 - y0) / 2 || 0}
                ></rect>
                <rect
                    className={`descendants descendants-invisible`}
                    x={x0 || 0}
                    y={posY || 0}
                    rx="15"
                    ry="15"
                    width={x1 - x0 || 0}
                    height={y1 - y0 || 0}
                ></rect>

            </g>
        );
    }
}