import { compose } from 'redux';
import { withReduxSaga } from '../../redux/store';
import WithData from './withData';
import WithLang from '../withLang';
import WithLayout from './withLayout';

export default compose(withReduxSaga, WithData, WithLayout, WithLang);
