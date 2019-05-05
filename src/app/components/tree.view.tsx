import * as React from 'react';
import DomParserService from '../services/dom.parser';
import { resolve } from 'inversify-react';
import D3View from './d3.view';

interface IProps{
    url: string;
}

export default class TreeView extends React.Component<IProps, any>{

    @resolve(DomParserService)
    domParser: DomParserService;

    componentWillReceiveProps(nextProps: IProps){
        if(nextProps.url != this.props.url){
            this.domParser.getTree(nextProps.url).then(result => {
                console.log(result);
            });
        }
    }

    render(){
        return <D3View />
    }

}