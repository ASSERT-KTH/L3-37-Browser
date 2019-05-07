
import * as React from 'react';
import * as d3 from 'd3';


interface IProps{
    nodes: any[];
    links: any[];
    style?: React.CSSProperties;
    scale?: number;
    rotation?: number;

    dx?: number;
    dy?: number;

    width: number;
    height: number;
}

interface IState{
}
export default class D3View extends React.Component<IProps, IState>{
    
    constructor(props){
        super(props)

        this.state = {
        }
    }


    linkPath = d3.linkRadial().angle( (d: any) => d.x ).radius((d: any) => d.y);
    nodePosition = (d) => `translate(${d3.pointRadial(d.x, d.y)})`;
    svg: any;

    c: any;

    updateStyleAndAttrs() {
        const cx = this.props.width/2;
        const cy = this.props.height/2;

        const dx = this.props.dx || 0;
        const dy = this.props.dy || 0;
        
         d3.select(this.c)
          .selectAll('circle')
          .data(this.props.nodes)
          .transition()
          .attr('transform', this.nodePosition)

        d3.select(this.c)
        .selectAll('.nodes')  
        .attr("transform", 
            `translate(${cx + dx}, ${cy + dy}) 
            scale(${this.props.scale || 1}, ${this.props.scale || 1})
            rotate(${this.props.rotation||0})`)


        d3.select(this.c)
        .selectAll("path")
        .data(this.props.links)
        .classed('link', true)
        .transition()
        .attr('d', this.linkPath);

        d3.select(this.c)
        .selectAll('.links')  
        .attr("transform", 
        `translate(${cx + dx}, ${cy + dy}) 
        scale(${this.props.scale || 1}, ${this.props.scale || 1} )
        rotate(${this.props.rotation||0})`)

      }

    componentDidMount() {
        this.updateStyleAndAttrs()

    }
    
    componentDidUpdate() {
        this.updateStyleAndAttrs()
    }
    render(){

        const nodes = this.props.nodes.map((i, index) => <circle r={8} className={`node node-${i.data.name}`} key={index + 'node'} />)
        const links = this.props.links.map((i, index) => <path className='link' key={index + 'path'} />)

        const legend = {
            'p': 'Data component (a, p, label, span, td, th, img)',
            'div': 'Structural component (div, table, section)',
            'meta': 'Metadata component',
            'script': 'Script component',
            'button': 'Trigger component',
            'style': 'Style components (style, link)',
            'input': 'Input component (input, option)',
        }

        return (
        <React.Fragment>
            <svg style={this.props.style} 
            className='canvas' 
            width={this.props.width}
            ref={e => this.c = e}>
                <g className="links">
                    {links}
                </g>
                <g className="nodes">
                    {nodes}
                </g>
            </svg>
            {<svg style={this.props.style} className='legend' width={this.props.width} height={this.props.height}>
                <g className="nodes">
                    {
                        Object.keys(legend).map((i, index) => 
                        (<React.Fragment>
                            <circle key={index + 'node'} className={`node node-${i}`} transform={`translate(10, ${55 + index*22})`} r={5}/>
                            <text key={index + 'text'} transform={`translate(30, ${59 + index*22})`}>{legend[i]}</text></React.Fragment>))
                    }
                </g>
                </svg>}
        </React.Fragment>    );
    }
}