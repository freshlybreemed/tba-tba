import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Dropzon from '../../containers/AdvancedUI/dropzone/';

export default Page(() => (
  <div>
    <Helmet>
      <title>Dropzon</title>
    </Helmet>
    <div>
      <Dropzon />
    </div>
  </div>
));
