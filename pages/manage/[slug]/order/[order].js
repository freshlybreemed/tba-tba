import Helmet from 'react-helmet';
import Page from '../../../../hocs/securedPage';
import Order from '../../../../containers/Order';

export default Page(props => (
  <div>
    <Helmet>
      <title>Create Event</title>
      {/* <link
        href="//cdnjs.cloudflare.com/ajax/libs/antd/3.23.4/antd.css"
        rel="stylesheet"
      /> */}
      <link href='//cdn.quilljs.com/1.3.6/quill.snow.css' rel='stylesheet' />
    </Helmet>
    <div>
      <Order event={props.event} customer={props.customer} />
    </div>
  </div>
));
