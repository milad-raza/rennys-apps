import { contextHoc } from '../contextHoc';
import DataContext from './dataProvider.context';

export const withData = contextHoc(DataContext);

export default withData;
