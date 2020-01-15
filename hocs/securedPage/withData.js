import React, { Component } from 'react';
import redirect from '../../helpers/redirect';
import { getCookie } from '../../helpers/session';
import absoluteUrl from 'next-absolute-url';

import 'isomorphic-fetch';

export default ComposedComponent =>
  class WithData extends Component {
    static async getInitialProps(context) {
      const isLoggedIn = getCookie('id_token', context.req) ? true : false;
      if (!isLoggedIn) {
        return redirect(context, '/');
      }
      const query = Object.keys(context.query).length > 0;
      console.log(context.query);
      if (query) {
        switch (Object.keys(context.query)[0]) {
          case 'slug':
            const { slug } = context.query;
            const { origin } = absoluteUrl(context.req);
            console.log('origin', origin, slug);
            const res = await fetch(`${origin}/api/event/${slug}`);
            const json = await res.json();
            const errorCode = json.length === 1 ? 200 : 404;
            if (context.query.order) {
              const { order } = context.query;
              const customer = json[0].tickets.filter(tix => {
                return order === tix.created.toString().slice(-5);
              })[0];
              return { isLoggedIn, event: json[0], errorCode, customer };
            } else {
              return { isLoggedIn, event: json[0], errorCode };
            }
          default:
            break;
        }
      }

      return { isLoggedIn };
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
