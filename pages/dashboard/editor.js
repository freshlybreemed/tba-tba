import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Editor from '../../containers/Forms/editor';

export default Page(() => (
  <div>
    <Helmet>
      <title>Editor</title>
    </Helmet>
    <div>
      <Editor />
    </div>
  </div>
));
