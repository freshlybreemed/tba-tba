import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Progress from '../../containers/Forms/Progress';

export default Page(() => (
  <div>
    <Helmet>
      <title>Progress</title>
    </Helmet>
    <div>
      <Progress />
    </div>
  </div>
));
