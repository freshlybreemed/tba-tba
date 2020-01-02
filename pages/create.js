import Helmet from 'react-helmet';
import Page from '../hocs/securedPage';
import Create from '../containers/Create';

export default Page(() => (
  <div>
    <Helmet>
      <title>Create Event</title>
    </Helmet>
    <div>
      <Create />
    </div>
  </div>
));
