import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Carousel from '../../containers/Uielements/Carousel';

export default Page(() => (
  <div>
    <Helmet>
      <title>Carousel</title>
    </Helmet>
    <div>
      <Carousel />
    </div>
  </div>
));
