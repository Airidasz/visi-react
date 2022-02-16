import { useState } from 'react';
import { useContext, createContext, createElement, useMemo } from 'react';
import useApi from './useApi';

const DataStore = () => {
  const { GetRequest } = useApi();
  const [store, setStore] = useState({
    categories:null
  });

  const loadCategories = async () => {
    if (store.categories) 
      return;
    
    const response = await GetRequest('categories');

    if(!response)
      return;

    const data = await response.json();

    store.categories = data;
    setStore({...store});
    
  };
  
  return {store, setStore, loadCategories};
};

const StoreContext = createContext(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('dataStore must be used within DataStoreProvider');
  }

  return store;
};

export const StoreProvider = ({ children }) => {
  const { store, setStore, loadCategories } = DataStore();
  const memo = useMemo(() => ({ store, setStore, loadCategories }), [ store, setStore, loadCategories ] );
  return createElement(StoreContext.Provider, { value: memo }, children);
};