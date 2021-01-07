import React, {
  useMemo, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import DataContext from './dataProvider.context';



export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState();
  const [loadingValue, setLoadingValue] = useState()
  const [data, setData] = useState([]);

  const value = useMemo(
    () => ({
      loading,
      loadingValue,
      data,
    }),
    [
      loading,
      loadingValue,
      data,
    ],
  );

  const fetchData = useCallback(()=>{
    return new Promise(resolve=>{
      fetch('./apps.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }).then(response => {
        return response.json();
      }).then(data => {
        resolve(data)
      }).catch(err => {
        console.error({err})
        resolve(false);
      });
    })


  }, [])

  useEffect(() => {
    setLoading(true)
    setLoadingValue("0%")
    fetchData().then(result=>{
      if(result){
        setTimeout(() => {
          setLoadingValue("25%")
        }, 1000);
        setTimeout(() => {
          setLoadingValue("50%")
        }, 2000);
        setTimeout(() => {
          setLoadingValue("75%")
        }, 3000);
        setTimeout(() => {
          setLoadingValue("100%")
          setData(result)
          setLoading(false)
        }, 4000);
      }else{
        setData(false)
        setLoading(false)
      }
    })
  }, [fetchData]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
