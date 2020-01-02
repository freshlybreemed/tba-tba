import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Tree from '../../containers/Uielements/Tree';

export default Page(() => (
  <div>
    <Helmet>
      <title>Tree</title>
    </Helmet>
    <div>
      <Tree />
    </div>
  </div>
));
