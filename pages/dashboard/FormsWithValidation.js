import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import FormsWithValidation from '../../containers/Forms/FormsWithValidation';

export default Page(() => (
  <div>
    <Helmet>
      <title>FormsWithValidation</title>
    </Helmet>
    <div>
      <FormsWithValidation />
    </div>
  </div>
));
