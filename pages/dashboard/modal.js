import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
;
import Modal from '../../containers/Feedback/Modal';

export default Page(() => (
  <div>
    <Helmet>
      <title>Modal</title>
    </Helmet>
    <div>
      <Modal />
    </div>
  </div>
));
