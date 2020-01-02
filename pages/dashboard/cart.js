import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Cart from '../../containers/Ecommerce/cart';

export default Page(() => (
  <div>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    <div>
      <Cart />
    </div>
  </div>
));
