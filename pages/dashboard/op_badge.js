import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Badge from '../../containers/Uielements/Badge';

export default Page(() => (
  <div>
    <Helmet>
      <title>Badge</title>
    </Helmet>
    <div>
      <Badge />
    </div>
  </div>
));
