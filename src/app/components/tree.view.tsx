import * as React from 'react';
import DomParserService from '../services/dom.parser';
import { resolve } from 'inversify-react';
import D3View from './d3.view';
import { Slider, Card, InputNumber } from 'antd';
import * as d3 from 'd3';
interface IProps{
    url: string;
    style?: React.CSSProperties;
}

interface IState{
    nodes?: any[];
    links?: any[];
    scale: number;
    rotation: number;

    width: number;
    height: number;
    dx: number;
    dy: number;

    processing: boolean;
}

export default class TreeView extends React.Component<IProps, IState>{

    @resolve(DomParserService)
    domParser: DomParserService;

    constructor(props){
        super(props)

        this.state = {
            nodes: [],
            links: [],
            scale: 1,
            width: 500,
            height: 500,
            rotation: 0,
            dx: 0,
            dy: 0,
            processing: false
        }
    }

    componentWillReceiveProps(nextProps: IProps){
        if(nextProps.url != this.props.url){
            this.setState({processing: true})
            this.domParser.getTree(nextProps.url).then(result => {


                const root = d3.hierarchy(result);
                const MARGIN = 40;

                const layout = d3.cluster().size([2 * Math.PI, Math.min(this.state.width, this.state.height)/2 - 2*MARGIN]);
                layout(root);

                this.setState({nodes: root.descendants()
                    , links: root.links(), processing: false})
            }).catch(error => {
                this.setState({processing: false})
            });
        }
    }

    componentDidMount(){
        this.checkSize()
    }

    // Very good hack
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    c: any;
    checkSize = async () => {
        if(this.c){
            if(this.state.width !== this.c.clientWidth || this.state.height !== this.c.clientHeight){
                if(this.c.clientWidth > 0 && this.c.clientHeight > 0)
                    this.setState({width: this.c.clientWidth, height: this.c.clientHeight})
            }
        }

        await this.sleep(1000);
        this.checkSize();
    }

    render(){

        
        const tags = [
            'head',
            'meta',
            'script',
            'style',
            'link',
            'label',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'span',
            'p',
            'td',
            'th',
            'img',
            'i',
            'noscript',
            'u',
            'b',
            'cite',
            'input',
            'option',
            'form',
            'select',
            'a',
            'button',
            'iframe',
            'div',
            'section',
            'table',
            'tr',
            'center',
            'hr',
            'br',
            'tbody',
            'thead',
            'footer',
            'body',
            'ul',
            'li',
            'ol',
            'html'
        ];

        if(!this.state.nodes || !this.state.links)
            return null;

        return  (<div className='canvas' ref={e => this.c = e}>
                
                <D3View 
                scale={this.state.scale}  
                rotation={this.state.rotation}
                dx={this.state.dx}
                dy={this.state.dy}
                style={{
                    ...this.props.style,
                    marginTop: '20px'
                }} 
                width={this.state.width}
                height={this.state.height}
                nodes={this.state.nodes} 
                links={this.state.links} />

                <Card className='toolbar' style={{ width: 300,
                     right: '50px', top: '50px', height: 470 }}>
                    <div id="legend">
                        { tags.map(item => <span className={`legend-item legend-item-${item}`}>{item}</span>) }
                    </div>
                    {!this.state.processing && <React.Fragment>

                    <div>
                        <h4>Zoom</h4>
                        <Slider
                                value={this.state.scale}
                                onChange={e => this.setState({scale: e as any})}
                                min={1}
                                max={5}
                                step={0.05}
                            />
                    </div>

                        <div>
                            <h4>Rotation</h4>
                            <Slider
                                    value={this.state.rotation}
                                    onChange={e => this.setState({rotation: e as any})}
                                    min={0}
                                    max={360}
                                    step={10}
                                />
                        </div>

                        <div>
                            <h4>X</h4>
                            <InputNumber onChange={e => this.setState({dx: e})} value={this.state.dx} />
                        </div>

                        <div>
                            <h4>Y</h4>
                            <InputNumber onChange={e => this.setState({dy: e})} value={this.state.dy} />
                        </div>
                    </React.Fragment>}

                </Card>   
                
            </div>)
    }

}