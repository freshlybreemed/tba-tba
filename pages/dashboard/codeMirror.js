import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import CodeMirror from '../../containers/AdvancedUI/codeMirror';

export default Page(() => (
  <div>
    <Helmet>
      <title>Code Mirror</title>
    </Helmet>
    <div>
      <CodeMirror />
    </div>
  </div>
));
