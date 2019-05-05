import * as React from 'react';
import DomParserService from '../services/dom.parser';
import { resolve } from 'inversify-react';
import D3View from './d3.view';

interface IProps{
    url: string;
}

interface IState{
    data?: any;
}

export default class TreeView extends React.Component<IProps, any>{

    @resolve(DomParserService)
    domParser: DomParserService;

    constructor(props){
        super(props)

        this.state = {
            data: undefined
        }
    }

    componentWillReceiveProps(nextProps: IProps){
        if(nextProps.url != this.props.url){
            this.domParser.getTree(nextProps.url).then(result => {
                this.setState({data: result})
            });
        }
    }

    render(){

        if(!this.state.data)
            return null;

        return <D3View url={this.props.url} data={this.state.data} />
    }

}