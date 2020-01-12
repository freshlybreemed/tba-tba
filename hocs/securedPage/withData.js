import React, { Component } from 'react';
import redirect from '../../helpers/redirect';
import { getCookie } from '../../helpers/session';
import absoluteUrl from 'next-absolute-url';

import 'isomorphic-fetch';

export default ComposedComponent =>
  class WithData extends Component {
    static async getInitialProps(context) {
      const isLoggedIn = getCookie('id_token', context.req) ? true : false;
      const query = Object.keys(context.query).length > 0;
      if (query) {
        switch (Object.keys(context.query)[0]) {
          case 'slug':
            const { slug } = context.query;
            const { origin } = absoluteUrl(context.req);
            console.log('origin', origin, slug);
            const res = await fetch(`${origin}/api/event/${slug}`);
            const json = await res.json();
            console.log('e', json);
            const errorCode = json.length === 1 ? 200 : 404;
            return { isLoggedIn, event: json[0], errorCode };
          default:
            break;
        }
      }
      if (!isLoggedIn) {
        redirect(context, '/');
      }

      return { isLoggedIn };
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
