
import * as React from 'react';
import * as d3 from 'd3';

interface IProps{
    x: number;
    y: number;

    r?: number;
    className?: string;
}

interface IState{
    x: number;
    y: number;

    r?: number;
}

export default class Node extends React.Component<IProps, IState>{

    constructor(props){
        super(props)
        this.state  ={
            x: this.props.x,
            y: this.props.y,
            r: this.props.r
        }
    }

    circleRef: any = React.createRef();

    componentDidUpdate(){
        d3.select(this.circleRef.current)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('cx', this.props.x)
        
        .on("end", () => {
            this.setState({x: this.props.x, y: this.props.y})
        })
    }

    render(){
        const { x, y } = this.state;

        return <circle className={this.props.className} r={this.props.r || 8} cx={x} cy={y} ref={this.circleRef} />
    }
}