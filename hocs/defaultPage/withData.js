import React, { Component } from 'react';
import 'isomorphic-fetch';
import absoluteUrl from 'next-absolute-url';

export default ComposedComponent =>
  class WithData extends Component {
    static getInitialProps = async context => {
      const query = Object.keys(context.query).length > 0;
      if (query) {
        switch (Object.keys(context.query)[0]) {
          case 'slug':
            const { slug } = context.query;
            const { origin } = absoluteUrl(context.req);
            const res = await fetch(`${origin}/api/event/${slug}`);
            const json = await res.json();
            const errorCode = json.length === 1 ? 200 : 404;
            return { event: json[0], errorCode };
            break;
          default:
            break;
        }
      }
      return {};
    };
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
