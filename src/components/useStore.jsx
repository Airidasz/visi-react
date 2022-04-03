/* eslint-disable no-empty */
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useContext, createContext, createElement, useMemo } from 'react';
import useApi from './useApi';

const DataStore = () => {
  const { GetRequest } = useApi();

  const initState = {
    categories: null,
    shops:null,
    user: {
      shop:null,
      admin: null,
      email: null,
      name: null,
      isSet: false,
      temp:false,
      exp:0,
    },
    permissions: {
      isBuyer:true
    },
    cart:[]
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [store, setStore] = useState(initState);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      if (store.categories)
        return;

      const response = await GetRequest('categories', null, false);

      if (!response)
        return;
    
      const data = await response.json();
    
      store.categories = data;
      setStore({ ...store });
      
    };

    const getShops = async () => {
      if (store.shops) 
        return;

      const response = await GetRequest('shops', null, false);

      if (!response)
        return;
    
      const data = await response.json();
    
      store.shops = data;
      setStore({ ...store });
    };

    getCategories();
    getShops();

  }, [store.categories, store.shops]);

  const setAccessToken = (accessToken) => {
    if (accessToken) {
      try {
        var decodedToken = jwt_decode(accessToken);
        decodePermissions(decodedToken.permissions);

        delete decodedToken.decodedToken;
        
        decodedToken.exp *= 1000;

        store.user = decodedToken;
        store.user.isSet = true;
 
        setStore({ ...store });

        localStorage.setItem('accessToken', accessToken);
      } catch (err) { }
    }
  };

  const decodePermissions = (persmissions) => {
    const p = persmissions.toLowerCase();

    if(p.includes('a'))
      store.permissions.isAdmin = true;

    if(p.includes('f'))
      store.permissions.isFarmer = true;

    if(store.permissions.isAdmin || store.permissions.isFarmer)
      store.permissions.isBuyer = false;

    setStore({...store});
  };

  const resetStore = () => {
    setStore({ ...initState });
  };

  return { store, setStore, isMobile, setAccessToken, resetStore };
};

export const StoreContext = createContext(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('dataStore must be used within StoreProvider');
  }

  return store;
};

export const StoreProvider = ({ children }) => {
  const { store, setStore, isMobile, setAccessToken, resetStore } = DataStore();
  const memo = useMemo(() => ({ store, setStore, isMobile, setAccessToken, resetStore }), [store, setStore, isMobile, setAccessToken, resetStore]);
  return createElement(StoreContext.Provider, { value: memo }, children);
};