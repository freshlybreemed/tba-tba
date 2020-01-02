import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
import Alert from '../../containers/Feedback/Alert';

export default Page(() => (
  <div>
    <Helmet>
      <title>Alert</title>
    </Helmet>
    <div>
      <Alert />
    </div>
  </div>
));
