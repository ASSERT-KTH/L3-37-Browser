
import * as React from 'react';
import * as d3 from 'd3';

interface IProps{
    
    path: any;
    className?: string;
}

interface IState{
    path: any
}

export default class Link extends React.Component<IProps, IState>{

    constructor(props){
        super(props)
        this.state  ={
            path: this.props.path,
        }
    }

    ref: any = React.createRef();

    componentDidUpdate(){


        /*
         console.log("Updating links", root.links())
        let links = d3.select(this.c).select(".links").selectAll('path.link')
            .data(root.links());
        links.exit().remove();
        links.enter().append('path').classed('link', true).attr('d', this.linkPath);
        links.transition().attr('d', this.linkPath); */

        d3.select(this.ref.current)
        .attr('d', this.props.path)
        .transition()
        .attr('d', this.props.path)
        .on("end", () => {
            this.setState({path: this.props.path})
        })
    }

    render(){
        const { path } = this.state;

        return <path className={this.props.className} d={path} ref={this.ref} />
    }
}