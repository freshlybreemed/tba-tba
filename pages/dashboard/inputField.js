import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import InputField from '../../containers/Forms/Input';

export default Page(() => (
  <div>
    <Helmet>
      <title>InputField</title>
    </Helmet>
    <div>
      <InputField />
    </div>
  </div>
));
