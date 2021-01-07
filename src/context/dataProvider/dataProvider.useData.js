import { useContext } from 'react';
import DataContext from './dataProvider.context';

export const useData = () => useContext(DataContext);

export default useData;
