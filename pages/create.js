import Helmet from 'react-helmet';
import Page from '../hocs/securedPage';
import Create from '../containers/Create';

export default Page(() => (
  <div>
    <Helmet>
      <title>Create Event</title>
      <link
        href="//cdnjs.cloudflare.com/ajax/libs/antd/3.23.4/antd.css"
        rel="stylesheet"
      />
      <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
    </Helmet>
    <div>
      <Create />
    </div>
  </div>
));
