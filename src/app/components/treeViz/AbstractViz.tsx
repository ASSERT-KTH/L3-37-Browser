import * as React from 'react';
import DomParserService from '../../services/dom.parser';
import { getLayout, getHierarchy } from '../../services/tree.actions';
import { resolve } from 'inversify-react';
import { MenuLateral } from './menu';
import { DTreeViz } from './dTree.viz';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    size: { width: number, height: number },
    marginTop,
    url: string,
}

interface IState {
    nodes?: any[],
    scale: number,
    processing: boolean,
    menuVisible: boolean,
    root: any,
    opacity: number,
    selected_categories: string[]
    mirror: boolean,
    colorTheme: boolean
}

const categories = {
    STCTR: { name: "Structure", active: true, items: ['head', 'body', 'footer', 'section', 'table', 'tr', 'center', 'hr', 'br', 'tbody', 'thead', 'ul', 'li', 'ol', 'html'] },
    SCRNLINK: { name: "Scripts & Links", active: true, items: ['script', 'link'] },
    META: { name: "Meata data", active: true, items: ['meta'] },
    STYLE: { name: "Style", active: true, items: ['style'] },
    PRESENT: { name: "Presentation", active: true, items: ['label'] },
    TITLE: { name: "Title", active: true, items: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    TEXT: { name: "Text", active: true, items: ['span', 'p', 'td', 'th', 'i', 'noscript', 'u', 'b', 'cite'] },
    MEDIA: { name: "Media", active: true, items: ['img', 'audio', 'video', 'svg'] },
    INPUT: { name: "Input", active: true, items: ['input'] },
    FORM: { name: "Formulary", active: true, items: ['form', 'select'] },
    ACTION: { name: "Actions", active: true, items: ['a', 'button',] },
    UNKN: { name: "Unkwown", active: true, items: [] }
};


const margin = 20;

export class AbstractViz extends React.Component<IProps, IState>{

    @resolve(DomParserService)
    domParser: DomParserService;

    constructor(props) {
        super(props)

        this.state = {
            nodes: [],
            scale: 5000,
            processing: false,
            menuVisible: false,
            root: null,
            opacity: 1,
            selected_categories: Object.keys(categories).map(e => categories[e].name),
            mirror: true,
            colorTheme: true
        }
    }


    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.url !== this.props.url) {
            this.getHTML(nextProps.url);
        }
    }

    componentDidMount() {
        this.getHTML(this.props.url);
    }

    // GET HTML Structure, process structure layout
    getHTML = (url) => {
        this.setState({ processing: true })
        this.domParser.getTree(url).then(result => {

            const root = getHierarchy(result);
            //TO DO: Remove all divs
            getLayout(root, this.state.scale, this.props.size.height / 2 - margin, 5);

            this.setState({
                nodes: root.descendants(),
                processing: false,
                root: root
            })
        }).catch(error => {
            this.setState({ processing: false })
        });
    }

    // Very good hack
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    handleClick = (active) => {
        this.setState({ menuVisible: active });
    }

    handleSlider = (e) => {
        const nRoot = this.state.root;
        getLayout(nRoot, e, this.props.size.height / 2 - margin, 5);

        this.setState({
            nodes: nRoot.descendants(),
            processing: false,
            root: nRoot,
            scale: e as any
        })
    }

    handleOpacity = (e) => {
        this.setState({
            opacity: e
        })
    }

    handleMirrorChange = (checked) => {
        this.setState({
            mirror: checked
        });
    }

    handleColorChange = (checked) => {
        this.setState({ colorTheme: checked })
    }



    render() {



        const loader = this.state.processing ? (
            <div id="spinLoader" style={{ position: 'absolute', top: this.props.size.height / 2, left: this.props.size.width / 2 }}>
                <FontAwesomeIcon icon={faSpinner} spin size="lg" />
            </div>) : <></>;

        const filterButton = (<div
            onMouseDown={() => this.handleClick(true)}
            className='btn-block' style={{ position: 'absolute', top: margin, left: margin, display: 'flex' }}>
            <FontAwesomeIcon icon={faArrowRight} />
            <div style={{ width: 15 }} />
            <div>Filter</div>
        </div>);



        const menuLateral = (<MenuLateral
            height={this.props.size.height - this.props.marginTop}
            handleClick={this.handleClick}
            visible={this.state.menuVisible}
            handleSlider={this.handleSlider}
            scale={this.state.scale}
            disabled={this.state.root === null}
            handleOpacity={this.handleOpacity}
            opacity={this.state.opacity}
            handleMirrorChange={this.handleMirrorChange}
            handleColorChange={this.handleColorChange}
            darkMode={this.state.colorTheme}
        />);

        const d3Viz = (<DTreeViz
            url={this.props.url}
            nodes={this.state.nodes}
            size={this.props.size}
            marginTop={this.props.marginTop}
            scale={this.state.scale}
            processing={this.state.processing}
            mirror={this.state.mirror}
            colorTheme={this.state.colorTheme}
        />)
            ;
        if (!this.state.nodes)
            return null;
        const color = this.state.colorTheme ? `linear-gradient(0deg, rgba(100,102,170,${this.state.opacity}) 15%, rgba(52,126,203,${this.state.opacity}) 50%, rgba(100,102,170,${this.state.opacity}) 85%)` : `rgba(0, 21, 41, ${this.state.opacity})`;
        return (
            <div className="gradient-bg"
                style={{
                    width: this.props.size.width,
                    height: this.props.size.height - this.props.marginTop - 1,
                    top: this.props.marginTop,
                    background: color
                    // background: 'rgb(100,102,170)',
                }}>
                {d3Viz}
                {filterButton}
                {menuLateral}
                {loader}
            </div>
        );
    }

}

