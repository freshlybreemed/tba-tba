import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Popconfirm from '../../containers/Feedback/Popconfirm';

export default Page(() => (
  <div>
    <Helmet>
      <title>Popconfirm</title>
    </Helmet>
    <div>
      <Popconfirm />
    </div>
  </div>
));
