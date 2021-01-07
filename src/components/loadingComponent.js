import React from 'react';
import {useData} from '../context/dataProvider/dataProvider.useData';

const LoadingComponent = () => {
    const {loadingValue}=useData();
    return ( <h1>loading... {loadingValue}</h1> );
}
 
export default LoadingComponent;