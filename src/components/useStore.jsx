import { useState } from 'react';
import { useContext, createContext, createElement, useMemo } from 'react';

const DataStore = () => {
  const [store, setStore] = useState({});
  return {store, setStore};
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
  const { store, setStore } = DataStore();
  const memo = useMemo(() => ({ store, setStore }), [ store, setStore ] );
  return createElement(StoreContext.Provider, { value: memo }, children);
};