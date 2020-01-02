import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import ReactTrend from '../../containers/Charts/reactTrend';

export default Page(() => (
  <div>
    <Helmet>
      <title>React Trend</title>
    </Helmet>
    <div>
      <ReactTrend />
    </div>
  </div>
));
