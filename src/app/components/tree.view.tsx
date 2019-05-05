import * as React from 'react';
import DomParserService from '../services/dom.parser';
import { resolve } from 'inversify-react';

interface IProps{
    url: string;
}

export default class TreeView extends React.Component<IProps, any>{

    @resolve(DomParserService)
    domParser: DomParserService;

    componentDidMount(){
        this.domParser.getTree();
    }

    render(){
        return <h2>{this.props.url}</h2>
    }

}