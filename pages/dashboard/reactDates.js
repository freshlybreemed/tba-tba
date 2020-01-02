import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import ReactDates from '../../containers/AdvancedUI/ReactDates/reactDates';

export default Page(() => (
  <div>
    <Helmet>
      <title>React Dates</title>
    </Helmet>
    <div>
      <ReactDates />
    </div>
  </div>
));
