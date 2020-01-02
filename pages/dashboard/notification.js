import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Notification from '../../containers/Feedback/Notification';

export default Page(() => (
  <div>
    <Helmet>
      <title>Notification</title>
    </Helmet>
    <div>
      <Notification />
    </div>
  </div>
));
