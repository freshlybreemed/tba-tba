import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0/index';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';

const { login } = authAction;

class SignUp extends React.Component {
  state = {
    redirectToReferrer: false,
  };
  componentDidUpdate(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login, history } = this.props;
    login(history);
  };
  handleSignUp = () => {
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
    Firebase.signup({ email, password })
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
          console.log(result);
        }
      });
  };
  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link href="/dashboard">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input
                  size="large"
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={event => {
                    this.setState({ firstName: event.target.value });
                  }}
                />
                <Input
                  size="large"
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={event => {
                    this.setState({ lastName: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.passwordVerify}
                  onChange={event => {
                    this.setState({ passwordVerify: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleSignUp}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signUpFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signUpGooglePlus" />
                </Button>
                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signUpAuth0" />
                  </Button>
                )}

                {Firebase.isValid && (
                  <FirebaseLogin signup={true} login={this.handleLogin} />
                )}
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link href="/signin">
                  <a href="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login },
)(SignUp);
