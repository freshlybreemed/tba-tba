import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Checkout from '../../containers/Ecommerce/checkout';

export default Page(() => (
  <div>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
    <div>
      <Checkout />
    </div>
  </div>
));
