import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';

const { logout } = authAction;
const userpic = '/static/image/user1.png';

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { userPic } = this.props;
    console.log('userpic is ', userPic);
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink">Settings</a>
        <a className="isoDropdownLink">Feedback</a>
        <a className="isoDropdownLink">Help</a>
        <a className="isoDropdownLink" onClick={this.props.logout}>
          Logout
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={userPic ? userPic : userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userPic: state.Auth.toJS().idToken.accountSettings.image,
  };
};
export default connect(mapStateToProps, { logout })(TopbarUser);
