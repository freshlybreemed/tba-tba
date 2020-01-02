import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Transfer from '../../containers/Forms/Transfer';

export default Page(() => (
  <div>
    <Helmet>
      <title>Transfer</title>
    </Helmet>
    <div>
      <Transfer />
    </div>
  </div>
));
