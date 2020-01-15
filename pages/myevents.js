import Helmet from 'react-helmet';
import Page from '../hocs/securedPage';
import MyEvents from '../containers/MyEvents';

const myEvents = () => (
  <div>
    <Helmet>
      <title>My Events</title>
      {/* <link
        href='//cdnjs.cloudflare.com/ajax/libs/antd/3.23.4/antd.css'
        rel='stylesheet'
      /> */}
      <link href='//cdn.quilljs.com/1.3.6/quill.snow.css' rel='stylesheet' />
    </Helmet>
    <div>
      <MyEvents />
    </div>
  </div>
);

export default Page(myEvents);
