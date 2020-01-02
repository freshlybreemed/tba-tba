import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Rating from '../../containers/Uielements/rating';

export default Page(() => (
  <div>
    <Helmet>
      <title>rating</title>
    </Helmet>
    <div>
      <Rating />
    </div>
  </div>
));
