import Helmet from 'react-helmet';
import Page from '../../hocs/securedPage';
import Manage from '../../containers/Manage';

export default Page(props => {
  console.log(props);
  const { event } = props;
  return (
    <div>
      <Helmet>
        <title>Create Event</title>
        {/* <link
          href="//cdnjs.cloudflare.com/ajax/libs/antd/3.23.4/antd.css"
          rel="stylesheet"
        /> */}
        <link
          href='https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css'
          rel='stylesheet'
        />
      </Helmet>
      <Manage event={event} />
    </div>
  );
});
