import React from 'react';
import {useData} from '../context/dataProvider/dataProvider.useData'
import LoadingComponent from './loadingComponent';
import WholeApp from './WholeApp'


const HomeComponent = () => {
    const {loading} = useData();
    return loading ? (
      <LoadingComponent />
    ) : (
      <div>
        <WholeApp />
      </div>
    );
}
 
export default HomeComponent;