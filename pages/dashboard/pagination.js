import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Pagination from '../../containers/Uielements/Pagination/pagination.js';

export default Page(() => (
  <div>
    <Helmet>
      <title>Pagination</title>
    </Helmet>
    <div>
      <Pagination />
    </div>
  </div>
));
