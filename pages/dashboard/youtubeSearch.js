import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import YoutubeSearch from '../../containers/YoutubeSearch';

export default Page(() => (
  <div>
    <Helmet>
      <title>Alert</title>
    </Helmet>
    <div>
      <YoutubeSearch />
    </div>
  </div>
));
