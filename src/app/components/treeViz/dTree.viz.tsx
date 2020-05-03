import React from 'react';
import { trimString } from '../../services/actions'
import { TreeElement } from './Tree.Element'

interface IProps {
    url: string,
    nodes: any[],
    size: { width: number, height: number },
    marginTop: number
    scale: number
    processing: boolean,
    mirror: boolean,
    colorTheme: boolean

}



export const DTreeViz: React.FC<IProps> = ({ url, nodes, size, marginTop, scale, processing, mirror, colorTheme }): JSX.Element => {

    // URL BAR
    const urlWidth = 300;
    const padLeft = 20;
    const posY = mirror ? size.height / 2 : 100;
    const gURL = <g>
        <rect x={padLeft} y={posY - 15} rx="15" ry="15" width={urlWidth} height="30" fill={colorTheme ? '#2d2d2d' : "white"} />
        <text x={padLeft + 20} y={posY + 2} className={colorTheme ? "inputText" : "inputText-dark"} textAnchor='start' alignmentBaseline='middle'>{trimString(url, 35)} </text>
    </g>

    const blocks = nodes.map((n, i) => {
        // console.log(i, n.data.name)
        return <TreeElement
            key={i + n.data.name}
            ikey={i}
            name={n.data.name}
            x0={n.x0}
            y0={n.y0}
            x1={n.x1}
            y1={n.y1}
            tooltip={true}
            mirror={mirror}
            colorTheme={colorTheme}
        ></TreeElement>
    })
    const gPosY = mirror ? posY + 2 : posY - 7;
    return (
        <div key={1 + 'dTree'} className="container-scroll" style={{ width: size.width, height: size.height - marginTop - 1 }} >
            <svg key={1 + 'svg'} width={padLeft + urlWidth + scale} height={size.height - marginTop - 1}>
                {!processing ? <g transform={`translate(${padLeft + urlWidth - 10}, ${gPosY} )`}>{blocks}</g> : <></>}
                {gURL}
            </svg>
        </div>
    );
}


