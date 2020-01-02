import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
import AutoComplete from '../../containers/Forms/AutoComplete';

export default Page(() => (
  <div>
    <Helmet>
      <title>AutoComplete</title>
    </Helmet>
    <div>
      <AutoComplete />
    </div>
  </div>
));
