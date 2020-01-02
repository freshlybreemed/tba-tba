import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Contacts from '../../containers/Contacts';

export default Page(() => (
  <div>
    <Helmet>
      <title>Contacts</title>
    </Helmet>
    <div>
      <Contacts />
    </div>
  </div>
));
