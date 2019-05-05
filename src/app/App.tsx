import * as React from 'react';
import { Layout, Menu, Breadcrumb, Form, Input, Icon, Affix } from 'antd';
import TreeView from './components/tree.view';

const {SubMenu} = Menu;

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component<any, any>{


  constructor(props){
    super(props)

    this.state = {
      url: '',
      collapsed: false
    }
  }

  componentDidMount(){
    console.log(document.getElementById('view'))
    if(this.r){
      this.r.addEventListener('did-start-loading', (e) => {
        console.log(e, this.r.src)

        if(this.r.src !== this.state.url){

          const {
            setFieldsValue
          } = this.props.form;

          setFieldsValue({
            url: this.r.src
          })
        }
      });
    }
  }

  parseUrl = (val) => {
    let https = val.slice(0, 8).toLowerCase();
    let http = val.slice(0, 7).toLowerCase();
    if (https === 'https://') {
      return val;
    } else if (http === 'http://') {
      return val;
    } else {

      return 'http://' + val;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const val = this.parseUrl(values.url);

        this.setState({url: val})
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

    return (<Form style={{width: '100%', margin: ''}} onSubmit={this.handleSubmit}>
              <Form.Item
              >
                 {getFieldDecorator('url', {
                  })(
                    <Input prefix={<Icon type="cloud" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Url" addonAfter={<Icon type="setting" />} />
                  )}
            </Form.Item>
              
            </Form>)
  }

  render(){

    const {
      getFieldValue
    } = this.props.form;

    return ( <Layout style={{width:'100%', height: '100%'}}>
              <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={() => this.setState({collapsed: !this.state.collapsed})}
                    style={{paddingTop: '48px'}}
                  >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline">
                      
                    <SubMenu key="sub1" title={<span><Icon type="pie-chart" /></span>}>
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                      
                    </Menu>
                  </Sider>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '50px', padding:'5px' }}>
                  
                  {this.renderBar()}
                </Header>
                <div style={{width:'100%', height: '100%', paddingTop: '48px'}} >
                  <TreeView url={getFieldValue('url')} />
                  <webview ref={e => this.r = e} style={{width:'100%', height: '100%'}}  src={this.state.url} />
                </div>
              </Layout>);
  }
}

export default Form.create()(App);
