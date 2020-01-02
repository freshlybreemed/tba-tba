import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import Link from 'next/link';
import { Layout } from 'antd';
import Scrollbars from '../../components/utility/customScrollBar.js';
import Menu from '../../components/uielements/menu';
import IntlMessages from '../../components/utility/intlMessages';
// import getDevSidebar from '../../customApp/sidebar';
import SidebarWrapper from './sidebar.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';
import { siteConfig } from '../../config';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1),
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1),
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    const { app, toggleOpenDrawer, customizedTheme } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    const url = siteConfig.dashboard;
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars style={{ height: scrollheight - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              <Menu.Item key="mailbox">
                <Link href={`${url}/mailbox`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-mail" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.email" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="contacts">
                <Link href={`${url}/contacts`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-person-add" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.contacts" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="myEvents">
                <Link href={`/create`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-person-add" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.myEvents" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="create">
                <Link href={`/create`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-person-add" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.createEvent" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="ecommerce"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-bag" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.ecommerce" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="shop">
                  <Link href={`${url}/shop`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.shop" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="cart">
                  <Link href={`${url}/cart`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.cart" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="checkout">
                  <Link href={`${url}/checkout`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.checkout" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="card">
                  <Link href={`${url}/card`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.cards" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="map"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-map" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.maps" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="googlemap">
                  <Link href={`${url}/googlemap`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.googleMap" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="leafletmap">
                  <Link href={`${url}/leafletmap`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.leafletMap" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="youtubeSearch">
                <Link href={`${url}/youtubeSearch`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-social-youtube" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.youtubeSearch" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="calendar">
                <Link href={`${url}/calendar`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-calendar" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.calendar" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="notes">
                <Link href={`${url}/notes`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-clipboard" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.notes" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="todo">
                <Link href={`${url}/todo`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-list" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.todos" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="shuffle">
                <Link href={`${url}/shuffle`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-grid" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.shuffle" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="charts"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-arrow-graph-up-right" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.charts" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="googleChart">
                  <Link href={`${url}/googleChart`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.googleCharts" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reecharts">
                  <Link href={`${url}/reecharts`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.recharts" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reactVis">
                  <Link href={`${url}/reactVis`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.reactVis" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reactChart2">
                  <Link href={`${url}/reactChart2`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.reactChart2" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reactTrend">
                  <Link href={`${url}/reactTrend`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.reactTrend" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="Forms"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-mail" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.forms" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="inputField">
                  <Link href={`${url}/inputField`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.input" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="editor">
                  <Link href={`${url}/editor`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.editor" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="FormsWithValidation">
                  <Link href={`${url}/FormsWithValidation`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.formsWithValidation" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="progress">
                  <Link href={`${url}/progress`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.progress" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="button">
                  <Link href={`${url}/button`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.button" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="tab">
                  <Link href={`${url}/tab`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.tab" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="checkbox">
                  <Link href={`${url}/checkbox`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.checkbox" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="radiobox">
                  <Link href={`${url}/radiobox`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.radiobox" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="selectbox">
                  <Link href={`${url}/selectbox`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.selectbox" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="transfer">
                  <Link href={`${url}/transfer`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.transfer" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="autocomplete">
                  <Link href={`${url}/autocomplete`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.autocomplete" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="uielements"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-leaf" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.uiElements" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="op_badge">
                  <Link href={`${url}/op_badge`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.badge" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_card">
                  <Link href={`${url}/op_card`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.card2" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_carousel">
                  <Link href={`${url}/op_carousel`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.corusel" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_collapse">
                  <Link href={`${url}/op_collapse`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.collapse" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_popover">
                  <Link href={`${url}/op_popover`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.popover" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_tooltip">
                  <Link href={`${url}/op_tooltip`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.tooltip" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_tag">
                  <Link href={`${url}/op_tag`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.tag" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="op_timeline">
                  <Link href={`${url}/op_timeline`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.timeline" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="dropdown">
                  <Link href={`${url}/dropdown`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.dropdown" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="pagination">
                  <Link href={`${url}/pagination`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.pagination" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="rating">
                  <Link href={`${url}/rating`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.rating" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="tree">
                  <Link href={`${url}/tree`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.tree" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="advancedUielements"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-flash" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.advancedElements" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="reactDates">
                  <Link href={`${url}/reactDates`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.reactDates" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="codeMirror">
                  <Link href={`${url}/codeMirror`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.codeMirror" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="uppy">
                  <Link href={`${url}/uppy`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.uppy" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="dropzone">
                  <Link href={`${url}/dropzone`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.dropzone" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="feedback"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-thumbsup" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.feedback" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="alert">
                  <Link href={`${url}/alert`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.alert" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="modal">
                  <Link href={`${url}/modal`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.modal" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="message">
                  <Link href={`${url}/message`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.message" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="notification">
                  <Link href={`${url}/notification`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.notification" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="popconfirm">
                  <Link href={`${url}/popconfirm`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.popConfirm" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="spin">
                  <Link href={`${url}/spin`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.spin" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="table"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-menu" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.tables" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="table_ant">
                  <Link href={`${url}/table_ant`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.antTables" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="pages"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-document" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.pages" />
                    </span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="404">
                  <Link href={'/404'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.404" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="500">
                  <Link href={'/500'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.500" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="signin">
                  <Link href={'/signin'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.signIn" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="signup">
                  <Link href={'/signup'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.signUp" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="forgotpassword">
                  <Link href={'/forgotpassword'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.forgotPw" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="resetpassword">
                  <Link href={'/resetpassword'}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.resetPw" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="invoice">
                  <Link href={`${url}/invoice`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <span className="nav-text">
                        <IntlMessages id="sidebar.invoice" />
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                {/*<Menu.Item style={submenuStyle} key="comingSoon">
                  <Link to={`${url}/comingSoon`}>
                    <IntlMessages id="sidebar.comingSoon" />
                  </Link>
                </Menu.Item>*/}
              </SubMenu>
              <SubMenu
                key="sub1"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-options" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.menuLevels" />
                    </span>
                  </span>
                }
              >
                <MenuItemGroup
                  key="g1"
                  title={<IntlMessages id="sidebar.item1" />}
                >
                  <Menu.Item style={submenuStyle} key="1">
                    <IntlMessages id="sidebar.option1" />
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="2">
                    <IntlMessages id="sidebar.option2" />
                  </Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup
                  key="g2"
                  title={<IntlMessages id="sidebar.item2" />}
                >
                  <Menu.Item style={submenuStyle} key="3">
                    <IntlMessages id="sidebar.option3" />
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="4">
                    <IntlMessages id="sidebar.option4" />
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="githubSearch">
                <Link href={`${url}/githubSearch`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-social-github" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.githubSearch" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="blank_page">
                <Link href={`${url}/blank_page`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-document" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.blankPage" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed },
)(Sidebar);
