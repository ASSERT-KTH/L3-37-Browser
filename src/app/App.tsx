import React, { ChangeEvent } from 'react';
import { Layout, Form, Tabs, Slider } from 'antd';

import { getAllCookies, getCookiesFrom, deleteData } from './services/cookies'
import { getKey, setKey, clearData, addCookies } from './services/store'

import TreeView from './components/tree.view';
import { CookiesSideBar } from './components/cookieViz/cookiesSideBar';
import { CookiesViz } from './components/cookieViz/cookiesViz';
import { MainMenu } from './components/mainMenu';

const TabPane = Tabs.TabPane;
const { Content } = Layout;


//MENU ITEMS INTERFACE
interface IMenuItem {
  id: String,
  selected: Boolean,
  name: String,
  title: String,
  icon: String
}

interface IVizView {
  id: number,
  name: string,
  selected: boolean
}

interface IState {
  url: string,
  isURLValid: boolean,
  collapsed: boolean,
  opacity: any,
  height: number,
  width: number,
  menuItems: IMenuItem[],
  urlCookies: any,
  loading: boolean,
  userCookies: any,
  vizViews: IVizView[]
}


class App extends React.Component<any, IState>{

  constructor(props) {
    super(props)

    this.state = {
      url: 'http://www.google.com',
      isURLValid: true,
      collapsed: false,
      opacity: 0.1,
      height: 800,
      width: 1200,
      menuItems: [
        { id: '1', selected: false, name: "DELETECOOKIES", title: 'Delete cookies', icon: "global" },
        { id: '2', selected: false, name: "SOUNDVIZ", title: 'Sound Visualization', icon: "smile" },
        { id: '3', selected: false, name: "TREEVIZ", title: 'Tree Visualizaiton', icon: "heart" },
        { id: '4', selected: true, name: "COOKIEVIZ", title: 'Cookies Visualization', icon: "check-circle" },
        { id: '5', selected: false, name: "L3VIZ", title: 'l3-33 Visualization', icon: "check-circle" },
        { id: '6', selected: true, name: "BROWSER", title: 'Browser', icon: "global" },
      ],
      urlCookies: [],
      loading: false,
      userCookies: [],
      vizViews: [
        { id: 0, name: "COOKIES_HORIZONTAL_VIZ", selected: false }
      ]
    }
  }
  // COMPONENT ACTIONS
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    //Get local user cookies
    const localData = getKey('vizUserCookies')
    const userCookies = localData === null ? setKey('vizUserCookies', { cookies: [] }) : localData;
    this.setState(userCookies)

    if (this.pageView) {
      // this.pageView.addEventListener('did-start-loading', this.startLoading);
      this.updateUserCookies();
      this.pageView.addEventListener('did-finish-load', this.finishLoad);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  //-----------------------------------------------------------------------------------


  // Update windows dimensions
  updateWindowDimensions = () => { this.setState({ height: window.innerHeight, width: window.innerWidth }); }


  isActiveView(name: String, arrMenu: Object[]): Boolean {
    return arrMenu.find(element => element['name'] === name)['selected'];
  }

  setSelected(oName: String, arrMenu: IMenuItem[], active: Boolean): Array<IMenuItem> {
    return arrMenu.map(item => {
      item['name'] === oName ? item['selected'] = active : item['selected'] = false;
      return item;
    })
  }

  setViewSelected(oName: String, arrMenu: IVizView[], active: boolean): Array<IVizView> {
    return arrMenu.map(item => {
      if (item['name'] === oName) item['selected'] = active;
      return item;
    })
  }


  activateView = async (vName, active) => {
    switch (vName) {
      case 'COOKIEVIZ':
        this.setState({ menuItems: this.setSelected("COOKIEVIZ", this.state.menuItems, active) })
        this.setState({ vizViews: this.setViewSelected("COOKIES_HORIZONTAL_VIZ", this.state.vizViews, false) })
        break;
      case 'COOKIES_HORIZONTAL_VIZ':
        // this.setState({ menuItems: this.setSelected("COOKIEVIZ", this.state.menuItems, false) })
        const cookieViz = this.state.vizViews.find(item => item['name'] === "COOKIES_HORIZONTAL_VIZ")['selected'];
        this.setState({ vizViews: this.setViewSelected("COOKIES_HORIZONTAL_VIZ", this.state.vizViews, !cookieViz) })
        break;

      case 'L3VIZ':
        this.setState({ menuItems: this.setSelected("L3VIZ", this.state.menuItems, active) })
        break;
      case 'DELETECOOKIES':
        this.setState({ loading: true });
        deleteData().then(() => {
          this.updateUserCookies()
          this.setState({ loading: false });
        });
        clearData();
        break;
      default:
        break;
    }
  }

  finishLoad = (e) => {
    this.updateUrl(e);
    this.updateCookies();
    this.updateUserCookies();
    this.setState({ loading: false });
  }


  //get the cookies from the current URL
  async updateCookies() {
    const cookies = await getCookiesFrom(this.state.url);
    this.setState({ urlCookies: cookies });
  }

  //update the user cookies with 1st and 3rd party cookies
  async updateUserCookies() {
    //get electron cookies
    const electronCookies = await getAllCookies();
    //get current user cookies
    const localData = getKey('vizUserCookies');
    const userCookies = localData === null ? [] : localData['cookies'];

    //remove current url cookies from electron cookies
    const urlCookies = this.state.urlCookies.map(el => {
      el['type'] = 'FIRST_PARTY'
      el['origin'] = ''
      return el;
    })
    //Add the cookies -- if cookie does not exist then add else update it
    const updatedCookies = addCookies(urlCookies, userCookies)

    //remove user cookies from electron
    const urlCookesNames = updatedCookies.map(el => el.name + ':' + el.domain)
    //remaining cookies are 3rd party cookies  
    const thirdPartyCookies = electronCookies.filter(el => {
      return urlCookesNames.indexOf(el.name + ':' + el.domain) < 0;
    }).map(el => {
      el['type'] = 'THIRD_PARTY'
      el['origin'] = this.state.url
      return el;
    })
    //add 3rd party cookies and current URL cookies as 1st party cookies and save it locally
    const newCookies = [...thirdPartyCookies, ...updatedCookies]
    setKey('vizUserCookies', { cookies: newCookies })
    //set state with local cookies
    this.setState({ userCookies: newCookies })
  }

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
        this.setState({ loading: true });

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
          handleClick={this.activateView}
        ></MainMenu>


        {this.isActiveView("COOKIEVIZ", this.state.menuItems) ? <CookiesSideBar
          contentHeight={contentHeight}
          cookies={this.state.urlCookies}
          loading={this.state.loading}
          handleClick={this.activateView}
        ></CookiesSideBar> : <></>}

        <Content style={{ marginTop: 40, height: contentHeight }}>
          {this.isActiveView("L3VIZ", this.state.menuItems) ? l3Viz : <></>}
          {this.isActiveView("COOKIES_HORIZONTAL_VIZ", this.state.vizViews) ? <CookiesViz userCookies={this.state.userCookies} height={this.state.height} width={this.state.width} marginTop={40} currentURL={this.state.url} /> : <></>}
          <webview ref={e => this.pageView = e} style={{ width: '100%', height: '100%' }} src='http://www.google.com' />
        </Content>


      </Layout >);
  }
}

export default Form.create()(App);
