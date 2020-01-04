import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import { jwtConfig } from '../../config';
import AuthAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import { notification } from '../../components/index';

class SignIn extends Component {
  state = {
    visible: false,
    email: 'demo@gmail.com',
    password: 'demodemo',
    confirmLoading: false,
  };
  handleLogin = () => {
    const { login, history } = this.props;
    login(history);
  };

  handleFireLogin = () => {
    const { email, password } = this.state;
    if (!(email && password)) {
      notification('error', 'Please fill in email. and password');
      return;
    }
    this.setState({
      confirmLoading: true,
    });
    const self = this;
    let isError = false;
    Firebase.login(Firebase.EMAIL, { email, password })
      .catch(result => {
        const message =
          result && result.message ? result.message : 'Sorry Some error occurs';
        notification('error', message);
        self.setState({
          confirmLoading: false,
        });
        isError = true;
      })
      .then(result => {
        if (isError) {
          return;
        }
        if (!result || result.message) {
          const message =
            result && result.message
              ? result.message
              : 'Sorry Some error occurs';
          notification('error', message);
          self.setState({
            confirmLoading: false,
          });
        } else {
          self.setState({
            visible: false,
            confirmLoading: false,
          });
          const { login, history } = this.props;
          login({ ...result });
        }
      });
  };
  handleJWTLogin = () => {
    const { jwtLogin, history } = this.props;
    const userInfo = {
      username: document.getElementById('inputUserName').value || '',
      password: document.getElementById('inpuPassword').value || '',
    };
    // jwtLogin(history, userInfo);
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { isLoggedIn } = this.props;
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link href="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>
            <form>
              <div className="isoInputWrapper">
                <label>Email</label>
                <Input
                  size="large"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
              </div>
              <div className="isoInputWrapper" style={{ marginBottom: 10 }}>
                <label>Password</label>
                <Input
                  type="password"
                  size="large"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
              {/* <span className="isoResetPass" onClick={this.resetPassword}>
                Reset Password
              </span> */}
            </form>
            <div className="isoSignInForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleFireLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                <Link href="/signup">
                  <a href="/signup">
                    <Button type="primary btnFacebook">
                      <IntlMessages id="page.signUpButton" />
                    </Button>
                  </a>
                </Link>
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link href="/forgotpassword">
                  <div className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </div>
                </Link>
                <Link href="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    state,
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { ...AuthAction },
)(SignIn);
