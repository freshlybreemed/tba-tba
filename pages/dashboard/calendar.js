import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Calendar from '../../containers/Calendar/Calendar';

export default Page(() => (
  <div>
    <Helmet>
      <title>Alert</title>
    </Helmet>
    <div>
      <Calendar />
    </div>
  </div>
));
