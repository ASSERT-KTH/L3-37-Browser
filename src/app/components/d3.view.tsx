
import * as React from 'react';
import * as d3 from 'd3';


interface IProps{
    data: any;
    style?: React.CSSProperties;
}

interface IState{
    data: any;
    legend: any
    width: number;
    height: number;
}
export default class D3View extends React.Component<IProps, any>{
    
    constructor(props){
        super(props)

        this.state = {
            data: undefined,
            width: 500,
            height: 500,
            legend: {}
        }
    }

    updateNodes = (root) => {
        let nodes = d3.select(this.c).select(".nodes").selectAll('circle.node')
            .data(root.descendants());

        nodes.exit().remove();

        const legend = this.state.legend;

        nodes.enter()
            .append('circle')
            .attr('class', (d: any) => {

                if(!(d.data.name in this.state.legend))
                    legend[d.data.name] = 1
                

                return 'node ' + `node-${d.data.name}`
            })
            .attr('r', 8)
            .attr('transform', this.nodePosition)
        ;

        this.setState({legend: legend})
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

    setData = async (data) => {

        const width = this.state.width;
        const height = this.state.height;
        
        const MARGIN = 40;

        
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

    interval: any;

    componentDidMount(){
        this.setData(this.props.data);

        this.checkSize();
    }

    // Very good hack
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkSize = async () => {
        if(this.c){
            //console.log("Setting size", this.c.clientWidth, this.c.clientHeight);
            if(this.state.width !== this.c.clientWidth || this.state.height !== this.c.clientHeight){
                this.setState({width: this.c.clientWidth, height: this.c.clientHeight},  () => {
                    this.setData(this.props.data)
                })
            }
        }

        await this.sleep(1000);
        this.checkSize();
    }

    componentWillUnmount(){
        //clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps: IProps){
        if(nextProps.data !== this.props.data){

            console.log("Updating");
            this.setData(nextProps.data);
        }
    }

    render(){
        return (
        <React.Fragment>
           
            <svg style={this.props.style} className='canvas' ref={e => this.c = e}>
                    <g className="links"></g>
                    <g className="nodes"></g>
            </svg>
            <svg className='legend' width={400} height={400}>
                <g className="nodes">
                    {
                        Object.keys(this.state.legend).map((i, index) => 
                        (<React.Fragment>
                            <circle key={index + 'node'} className={`node node-${i}`} transform={`translate(10, ${10 + index*12})`} r={5}/>
                            <text key={index + 'text'} transform={`translate(20, ${15 + index*12})`}>{i}</text></React.Fragment>))
                    }
                </g>
            </svg>
        </React.Fragment>    );
    }
}