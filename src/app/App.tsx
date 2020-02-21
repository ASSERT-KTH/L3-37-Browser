import * as React from 'react';
import { Layout, Form, Input, Icon, Tabs, Slider } from 'antd';
import TreeView from './components/tree.view';

const TabPane = Tabs.TabPane;

const { Header } = Layout;

interface IState {
  url: string,
  isURLValid: boolean
  collapsed: boolean,
  opacity: any;
}

class App extends React.Component<any, IState>{

  constructor(props) {
    super(props)

    this.state = {
      url: 'http://google.com',
      isURLValid: true,
      collapsed: false,
      opacity: 0.5,
    }

  }

  updateUrl = (e) => {
    const url = e.target.src;

    const {
      setFieldsValue
    } = this.props.form;

    setFieldsValue({
      url
    })

    this.setState({ url })
  }

  componentDidMount() {
    console.log(document.getElementById('view'))
    if (this.pageView) {
      //this.pageView.addEventListener('did-start-loading', this.updateUrl);
      this.pageView.addEventListener('did-finish-load', this.updateUrl);
    }
  }

  getURL = (value: string): URL => {
    if (!/https?:\/\//.test(value)) {
      value = 'http://' + value;
    }
    return new URL(value);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("validating the parameters");
      if (err) {
        return;
      }
      try {
        let url = this.getURL(values.url);
        this.setState({ url: url.toString(), isURLValid: true });

        this.pageView.src = url;
      }
      catch (exc) {
        this.setState({ isURLValid: false });
      }
    });
  }

  pageView: any;

  getPageSrc = () => {
    if (this.pageView) {
      return this.pageView.src
    }
    return '';
  }

  render() {

    const {
      getFieldDecorator
    } = this.props.form;

    return (<Layout style={{ width: '100%', height: '100%' }}>
      <Header style={{ position: 'absolute', zIndex: 1, width: '80%', height: '50px', padding: '10px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {
              getFieldDecorator('url', {})(
                <Input prefix={<Icon type={this.state.isURLValid ? "cloud" : "ban"} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Url" />
              )
            }
          </Form.Item>
          {/*<StalkerComponent 
                    interval={10000}
                    url={this.state.url} 
                  onChange={e => this.pageView.src = e} />*/}
        </Form>
      </Header>


      <div className="card-container">
        <Tabs tabPosition='top' className='tabs-container' type="card">
          <TabPane className='main-container blending' forceRender key="1"
            tab={
              <Slider
                min={0}
                max={1}
                step={0.1}
                onChange={e => this.setState({ opacity: e })}
                value={this.state.opacity}
                style={{ minWidth: 100 }
                } />}>

            <TreeView style={{ opacity: 1 - this.state.opacity }} url={this.state.url} />
            <webview ref={e => this.pageView = e} style={{ width: '100%', height: '100%', opacity: this.state.opacity }} src='http://google.com' />
          </TabPane>
        </Tabs>
      </div>
    </Layout>);
  }
}

export default Form.create()(App);
