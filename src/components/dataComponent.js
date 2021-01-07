import React from 'react';
import {useData} from '../context/dataProvider/dataProvider.useData';

const DataComponent = () => {
    const { data } = useData();
    return <ul>
        {data.map(app=><li key={app.id}>{app.name}</li>)}
    </ul>
}
 
export default DataComponent;