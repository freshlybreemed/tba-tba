import { getCookie } from '../../helpers/session';
import redirect from '../../helpers/redirect';
import Manage from '../../containers/Manage';
import Page from '../../hocs/defaultPage';

const { fetchEvent } = actions;
const ManagePage = () => (
  <>
    Yo
    <Manage />
  </>
);

// ManagePage.getInitialProps = async context => {
//   //   const { manage } = context.query;
//   //   console.log('store', store);
//   const isLoggedIn = getCookie('id_token', context.req) ? true : false;
//   if (!isLoggedIn) {
//     redirect(context, '/');
//   }
//   return { isLoggedIn };
// };

export default Page(() => <ManagePage />);
