import React, { ChangeEvent } from 'react';
import { Layout, Form, Tabs, Slider } from 'antd';
import TreeView from './components/tree.view';
import { CookiesSideBar } from './components/cookiesSideBar';
import { MainMenu } from './components/mainMenu';
import { getAllCookies, getCookiesFrom } from './services/cookies'

const TabPane = Tabs.TabPane;
const { Content } = Layout;
// const Store = require('./services/store.ts');
// const store = new Store({
//   // We'll call our data file 'user-preferences'
//   configName: 'user-cookies',
//   defaults: {
//     cookies: []
//   }
// });

//MENU ITEMS INTERFACE
interface IMenuItem {
  id: String,
  selected: Boolean,
  name: String,
  title: String,
  icon: String
}

interface IState {
  url: string,
  isURLValid: boolean,
  collapsed: boolean,
  opacity: any,
  height: any,
  menuItems: IMenuItem[],
}


class App extends React.Component<any, IState>{

  constructor(props) {
    super(props)

    this.state = {
      url: 'http://google.com',
      isURLValid: true,
      collapsed: false,
      opacity: 0.9,
      height: 800,
      menuItems: [
        { id: '1', selected: false, name: "SOUNDVIZ", title: 'Sound Visualization', icon: "smile" },
        { id: '2', selected: false, name: "TREEVIZ", title: 'Tree Visualizaiton', icon: "heart" },
        { id: '3', selected: true, name: "COOKIEVIZ", title: 'Cookies Visualization', icon: "check-circle" },
        { id: '4', selected: false, name: "L3VIZ", title: 'l3-33 Visualization', icon: "check-circle" },
        { id: '5', selected: true, name: "BROWSER", title: 'Browser', icon: "global" },
      ],
    }
  }

  isActiveView(name: String, arrMenu: Object[]): Boolean {
    return arrMenu.find(element => element['name'] === name)['selected'];
  }


  // COMPONENT ACTIONS
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (this.pageView) {
      //this.pageView.addEventListener('did-start-loading', this.updateUrl);
      this.pageView.addEventListener('did-finish-load', this.updateUrl);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => { this.setState({ height: window.innerHeight }); }

  updateUrl = (e) => {
    const url = e.target.src;
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ url })
    this.setState({ url })
  }

  getURL = (value: string): URL => {
    if (!/https?:\/\//.test(value)) {
      value = 'http://' + value;
    }
    return new URL(value);
  }

  handleSubmit = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      try {
        let url = this.getURL(values.url);
        this.setState({ url: url.toString(), isURLValid: true });
        this.pageView.src = url;
        getCookiesFrom(url.toString());
        getAllCookies();
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
    const { getFieldDecorator } = this.props.form;
    const contentHeight = this.state.height - 41;
    const l3Viz = <div className="card-container">
      <Tabs tabPosition='top' className='tabs-container' type="card">
        <TabPane className='main-container blending' forceRender key="1"
          tab={
            <Slider
              min={0}
              max={1}
              step={0.1}
              onChange={e => this.setState({ opacity: e })}
              value={this.state.opacity}
              style={{ minWidth: 100 }}
            />
          }
        >
          <TreeView style={{ opacity: 1 - this.state.opacity }} url={this.state.url} />
        </TabPane>
      </Tabs>
    </div>;



    return (
      <Layout style={{ height: '100%' }}>
        <MainMenu
          handleSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          isURLValid={this.state.isURLValid}
          menuItems={this.state.menuItems}
        ></MainMenu>
        {this.isActiveView("L3VIZ", this.state.menuItems) ? l3Viz : <></>}

        {this.isActiveView("COOKIEVIZ", this.state.menuItems) ? <CookiesSideBar contentHeight={contentHeight}></CookiesSideBar> : <></>}

        <Content style={{ marginTop: 40, height: contentHeight }}>
          <webview ref={e => this.pageView = e} style={{ width: '100%', height: '100%', opacity: this.state.opacity }} src='http://google.com' />
        </Content>


      </Layout >);
  }
}

export default Form.create()(App);
