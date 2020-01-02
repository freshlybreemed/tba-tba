import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import GithubSearch from '../../containers/GithubSearch';

export default Page(() => (
  <div>
    <Helmet>
      <title>Github Search</title>
    </Helmet>
    <div>
      <GithubSearch />
    </div>
  </div>
));
