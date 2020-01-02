import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Radiobox from '../../containers/Forms/Radiobox';

export default Page(() => (
  <div>
    <Helmet>
      <title>Radiobox</title>
    </Helmet>
    <div>
      <Radiobox />
    </div>
  </div>
));
