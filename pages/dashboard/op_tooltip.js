import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Tooltip from '../../containers/Uielements/Tooltip';

export default Page(() => (
  <div>
    <Helmet>
      <title>Tooltip</title>
    </Helmet>
    <div>
      <Tooltip />
    </div>
  </div>
));
