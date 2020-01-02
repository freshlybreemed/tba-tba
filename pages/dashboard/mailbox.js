import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Mail from '../../containers/Mail';

export default Page(() => (
  <div>
    <Helmet>
      <title>Mail</title>
    </Helmet>
    <div>
      <Mail />
    </div>
  </div>
));
