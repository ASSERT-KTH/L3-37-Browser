import * as React from 'react';
import { Layout, Menu, Breadcrumb, Form, Input, Icon } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component<any, any>{

  constructor(props){
    super(props)

    this.state = {
      url: ''
    }
  }

  componentDidMount(){
    console.log(document.getElementById('view'))
    if(this.r){
      /*this.r.addEventListener('did-finish-load', (e) => {
        console.log(e, this.r.src)

        if(this.r.src != this.state.url){
          this.setState({url: this.r.src})
        }
      });*/
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let val = values.url;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            this.setState({url: val})
        } else if (http === 'http://') {
          this.setState({url: val})
        } else {

          this.setState({url: 'http://' + val})
        }
      }
    });
  }

  r: any;

  getValue = () => {
    if(this.r)
        return this.r.src
    return '';
  }

  renderBar(){

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    return (<Form style={{width: '100%', margin: '10px'}} layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item
              >
                 {getFieldDecorator('url', {
                  })(
                    <Input value={this.getValue()} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Url" />
                  )}
            </Form.Item>
              
            </Form>)
  }

  render(){
    return ( <Layout style={{width:'100%', height: '100%'}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '60px' }}>
                  
                  {this.renderBar()}
                </Header>
                <webview ref={e => this.r = e} style={{width:'100%', height: '100%', paddingTop: '60px'}}  src={this.state.url} />
                
              </Layout>);
  }
}

export default Form.create()(App);
