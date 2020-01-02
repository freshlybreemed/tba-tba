import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Notes from '../../containers/Notes';

export default Page(() => (
  <div>
    <Helmet>
      <title>Notes</title>
    </Helmet>
    <div>
      <Notes />
    </div>
  </div>
));
