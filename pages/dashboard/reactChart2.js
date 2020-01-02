import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import ReactChart2 from '../../containers/Charts/reactChart2';

export default Page(() => (
  <div>
    <Helmet>
      <title>React Chart2</title>
    </Helmet>
    <div>
      <ReactChart2 />
    </div>
  </div>
));
