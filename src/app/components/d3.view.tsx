
import * as React from 'react';
import * as d3 from 'd3';


interface IProps{
    width?: number;
    height?: number;
    data: any;

    url: string;
}

interface IState{
    data: any;
}
export default class D3View extends React.Component<IProps, any>{
    
    constructor(props){
        super(props)

        this.state = {
            data: undefined
        }
    }

    updateNodes = (root) => {
        let nodes = d3.select(this.c).select(".nodes").selectAll('circle.node')
            .data(root.descendants());

        nodes.exit().remove();

        nodes.enter()
            .append('circle')
            .classed('node', true)
            .attr('r', 8)
            .attr('transform', this.nodePosition)
        ;

        nodes.transition()
            .attr('transform', this.nodePosition);

    }

    updateLinks = (root) => {
        let links = d3.select(this.c).select(".links").selectAll('path.link')
            .data(root.links());
        links.exit().remove();
        links.enter().append('path').classed('link', true).attr('d', this.linkPath);
        links.transition().attr('d', this.linkPath);
    }

    linkPath = d3.linkRadial().angle( (d: any) => d.x ).radius((d: any) => d.y);
    nodePosition = (d) => `translate(${d3.pointRadial(d.x, d.y)})`;
    svg: any;

    setData(data){

        const width = this.props.width || this.c.clientWidth;
        const height = this.props.height || this.c.clientHeight;
        
        const MARGIN = 10;

        
        this.svg = d3.select(this.c)

        const root = d3.hierarchy(data);
        
        const layout = d3.cluster().size([2 * Math.PI, Math.min(width, height)/2 - 2*MARGIN]);
        layout(root);


        this.updateNodes(root);
        this.updateLinks(root);


        let centerX = width/2;
        let centerY = height/2;


        this.svg.select('.nodes').attr('transform', `translate(${centerX},${centerY})`);
        this.svg.select('.links').attr('transform', `translate(${centerX},${centerY})`);

    }

    c: any;

    componentDidMount(){
        this.setData(this.props.data);
    }

    componentDidUpdate(){
        this.setData(this.props.data);
    }

    render(){
        return (<svg className='canvas' ref={e => this.c = e}>
                    <g className="links"></g>
                    <g className="nodes"></g>
            </svg>);
    }
}