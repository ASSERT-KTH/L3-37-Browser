import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Slider, Switch } from 'antd';
import { TreeElement } from './Tree.Element'


interface IMenuLateralProps {
    height: number,
    handleClick: Function,
    visible: boolean,
    handleSlider: any,
    scale: number,
    disabled: boolean,
    handleOpacity: Function
    opacity: number,
    handleMirrorChange: Function,
    handleColorChange: Function,
    darkMode: boolean

}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ height, handleClick, visible, handleSlider, scale, disabled, handleOpacity, opacity, handleMirrorChange, handleColorChange, darkMode }): JSX.Element => {

    let classes = ''
    classes = !visible ? ' invisible' : classes;

    const hideBtn = <div
        onMouseDown={() => handleClick(false)}
        className='btn-block' style={{ display: 'flex' }}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <div style={{ width: 15 }} />
        <div>Hide filter</div>
    </div>;


    const minWidth = 1000;
    const maxWidth = 30000;
    const mid = maxWidth / 2;

    const marks = {
        1000: `${minWidth} px`,
        3000: '',
        15000: `${mid} px`,
        20000: '',
        30000: `${maxWidth} px`,
    };
    const widthSlider = (<div
        className='top-slider'
    >
        <h3>Size:</h3>
        <Slider
            value={scale}
            marks={marks}
            onChange={(e) => handleSlider(e)}
            min={minWidth}
            max={maxWidth}
            step={null}
            disabled={disabled}
        />
    </div>);

    const opacityMarks = {
        0: 0,
        0.25: '',
        0.5: 0.5,
        0.75: '',
        1: 1,
    };
    const opacitySlider = (
        <div
            className='top-slider'
        >
            <h3>Opacity:</h3>
            <Slider
                value={opacity}
                marks={opacityMarks}
                onChange={(e) => handleOpacity(e)}
                min={0}
                max={1}
                step={null}
            />
        </div>
    )



    //modify display
    function onChange(checked) {
        handleMirrorChange(checked);
    }

    //modify color theme
    function colorChange(checked) {
        handleColorChange(checked);
    }


    const layoutSelection = (
        <div>
            <h3>Layout Selection:</h3>
            <Switch checkedChildren="Split" unCheckedChildren="Simple" defaultChecked onChange={onChange} />
        </div>
    )

    const colorTheme = (
        <div>
            <h3>Color theme:</h3>
            <Switch checkedChildren="Color" unCheckedChildren="Night" defaultChecked onChange={colorChange} />
        </div>
    )

    const leyendStruc = {
        struct: {
            name: "Structure",
            items: ['header', 'article', 'nav', 'head', 'body', 'footer', 'section', 'table', 'tr', 'center', 'hr', 'br', 'tbody', 'thead', 'ul', 'li', 'ol', 'html', '#document']
        },
        items: {
            name: "Script",
            items: ['script']
        },
        meta: {
            name: "Meta Information",
            items: ['meta']
        },
        style: {
            name: "Style",
            items: ['style']
        },
        title: {
            name: "Title",
            items: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label']
        },
        text: {
            name: "Text",
            items: ['span', 'p', 'td', 'th', 'i', 'noscript', 'u', 'b', 'cite']
        },
        media: {
            name: "Media",
            items: ['img', 'audio', 'video', 'picture']
        },
        form: {
            name: "Form",
            items: ['form', 'select', 'input', 'option', 'fieldset']
        },
        action: {
            name: "Action",
            items: ['a', 'button',]
        },
        link: {
            name: "Link",
            items: ['link']
        },
        div: {
            name: "Div",
            items: ['div']
        },
        unknown: {
            name: "Unknown",
            items: ['unknown']
        },
        svg: {
            name: "SVG",
            items: ["svg", "animate", "animationMotion", "animateTransform", "circle", "clipPath", "color-profile", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvelveMatrix", "feDiffuseLightning", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "FeSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreigObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "solidcolor", "stop", "switch", "symbol", "textPath", "tspan", "use", "view"]
        },
    }

    const kys = Object.keys(leyendStruc).map((e, i) => {
        const size = 50;
        return (
            <div key={i + e} >
                <h4>{leyendStruc[e].name}</h4>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <svg width={size} height={size}>
                        <TreeElement
                            ikey={i}
                            name={leyendStruc[e].items[0]}
                            x0={0}
                            y0={0}
                            x1={size}
                            y1={size}
                            tooltip={false}
                            mirror={false}
                            colorTheme={darkMode}
                        />
                    </svg>
                    <div className='spacing-wlarge' />
                    <div style={{ display: 'flex', flexFlow: 'wrap', width: '190px' }}>
                        {leyendStruc[e].items.map((item, i) => <span key={i + item} className={`descendants descendants-span`}>{item}</span>)}
                    </div>
                </div>
                <div className='spacing-small' />
            </div>
        )

    })

    const legend = (
        <div key={1 + 'legend'}>
            <h3>Legend:</h3>
            <div >
                {kys}
            </div>
        </div>
    );

    //get legend keys
    //for in keys, render title, drawing and map items

    return <div id="lateral-menu" className={classes}
        style={{ height: height }}
    >
        {hideBtn}
        {widthSlider}
        <div className='spacing-small' />
        {opacitySlider}
        <div className='spacing-small' />
        {layoutSelection}
        <div className='spacing-small' />
        {colorTheme}
        <div className='spacing-small' />

        {legend}

    </div>
}