import App from 'next/app';
import axios from 'axios';
import { Provider } from 'react-redux';
import { withReduxSaga } from '../redux/store';
import { setCookie, getCookie, removeCookie } from '../helpers/session';

class MyApp extends App {
  // function MyApp({ Component, pageProps }) {

  static getInitialProps = async appContext => {
    const { ctx } = appContext;
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    // console.log('req', ctx.req);

    const appProps = await App.getInitialProps(appContext);

    return { ...appProps, userId: getCookie('id_token', ctx.req) };
  };
  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      const login = async () => {
        const resUser = await axios
          .get(`/api/user/${userId}`)
          .then(res => {
            console.log('res', res);
          })
          .catch(err => {
            console.log(err);
          });
      };

      login();
    }
  }
  render() {
    const { Component, pageProps, store } = this.props;

    return <Component {...pageProps} />;
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

export default MyApp;
