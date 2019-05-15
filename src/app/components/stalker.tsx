import * as React from 'react';
import DomParserService from '../services/dom.parser';
import { resolve } from 'inversify-react';
import D3View from './d3.view';
import { Slider, Card, InputNumber } from 'antd';
import * as d3 from 'd3';
import DomQueryService from '../services/dom.query';
interface IProps{
    url: string;
    onChange: (url: string) => void;
    interval?: number;
}

interface IState{
    urls: string[];
}

export default class StalkerComponent extends React.Component<IProps, IState>{

    @resolve(DomQueryService)
    domQuery: DomQueryService;

    @resolve(DomParserService)
    domParser: DomParserService;

    constructor(props){
        super(props)

        this.state = {
            urls: []
        }
    }

    componentDidMount(){
        this.parseAndGather(this.props.url)

        //this.walk();
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    parseAndGather = async (url: string) => {

        console.log("Gathering new url");
        
        const dom = await this.domParser.getContent(url);

        const link = await this.domQuery.getLinks(dom);

        await this.sleep(this.props.interval || 2000);

        this.props.onChange(link);

        this.parseAndGather(this.props.url)
    }


    /*componentWillReceiveProps(nextProps: IProps){
        if(nextProps.url !== this.props.url){
            this.parseAndGather(nextProps.url)
        }
    }*/

    walk = async () => {

        await this.sleep(this.props.interval || 2000);
        this.walk();
    }

    render(){

        return <h1>{this.props.url}</h1>
    }

}