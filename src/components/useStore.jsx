/* eslint-disable no-empty */
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useContext, createContext, createElement, useMemo } from 'react';
import useApi from './useApi';

const DataStore = () => {
  const { GetRequest } = useApi();
  const [accessToken, setAccessToken] = useState();

  const initState = {
    categories: null,
    user: {
      shop:null,
      admin: null,
      email: null,
      id: null,
      isSet: false,
      exp:0
    },
    permissions: {}
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [store, setStore] = useState(initState);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (accessToken) {
      try {
        var decodedToken = jwt_decode(accessToken);
        decodePermissions(decodedToken.permissions);

        delete decodedToken.decodedToken;
        
        decodedToken.exp *= 1000;

        store.user = decodedToken;
        store.user.isSet = true;

        console.log('store.user', store.user);
 
        setStore({ ...store });

        localStorage.setItem('accessToken', accessToken);
      } catch (err) { }
    }
  }, [accessToken]);

  const decodePermissions = (persmissions) => {
    const p = persmissions.toLowerCase();

    if(p.includes('a'))
      store.permissions.isAdmin = true;

    if(p.includes('f'))
      store.permissions.isFarmer = true;

    setStore({...store});
  };

  const resetStore = () => {
    setStore({ ...initState });
  };

  const loadCategories = async () => {
    if (store.categories)
      return;

    const response = await GetRequest('categories', null, false);

    if (!response)
      return;

    const data = await response.json();

    store.categories = data;
    setStore({ ...store });

  };

  return { store, setStore, isMobile, loadCategories, setAccessToken, resetStore };
};

export const StoreContext = createContext(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('dataStore must be used within DataStoreProvider');
  }

  return store;
};

export const StoreProvider = ({ children }) => {
  const { store, setStore, isMobile, loadCategories, setAccessToken, resetStore } = DataStore();
  const memo = useMemo(() => ({ store, setStore, isMobile, loadCategories, setAccessToken, resetStore }), [store, setStore, isMobile, loadCategories, setAccessToken, resetStore]);
  return createElement(StoreContext.Provider, { value: memo }, children);
};