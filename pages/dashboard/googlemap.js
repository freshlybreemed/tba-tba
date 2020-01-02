import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import { GoogleMap } from '../../containers/Map';

export default Page(() => (
  <div>
    <Helmet>
      <title>Google Map</title>
    </Helmet>
    <div>
      <GoogleMap />
    </div>
  </div>
));
