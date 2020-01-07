import Head from 'next/head';
import AccountSettings from '../containers/AccountSettings';
import Page from '../hocs/securedPage';

export default Page(() => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/react-vis.css" />
      </Head>
      <AccountSettings />
    </>
  );
});
