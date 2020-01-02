import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Shop from '../../containers/Ecommerce/algolia/instantSearch';

export default Page(() => (
  <div>
    <Helmet>
      <title>Shop</title>
    </Helmet>
    <div>
      <Shop />
    </div>
  </div>
));
