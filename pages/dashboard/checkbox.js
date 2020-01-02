import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Checkbox from '../../containers/Forms/Checkbox';

export default Page(() => (
  <div>
    <Helmet>
      <title>Checkbox</title>
    </Helmet>
    <div>
      <Checkbox />
    </div>
  </div>
));
