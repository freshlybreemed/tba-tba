import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Timeline from '../../containers/Uielements/Timeline';

export default Page(() => (
  <div>
    <Helmet>
      <title>Timeline</title>
    </Helmet>
    <div>
      <Timeline />
    </div>
  </div>
));
