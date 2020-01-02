import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import { LeafletMap } from '../../containers/Map';

export default Page(() => (
  <div>
    <Helmet>
      <title>Leaflet Map</title>
    </Helmet>
    <div>
      <LeafletMap />
    </div>
  </div>
));
