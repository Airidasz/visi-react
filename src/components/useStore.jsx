/* eslint-disable no-empty */
import { useState, useEffect } from 'react';
import { useContext, createContext, createElement, useMemo } from 'react';
import useApi from './useApi';
import { useAuth } from './useAuth';

const DataStore = () => {
  const { GetRequest } = useApi();
  const { auth } = useAuth();

  const initState = {
    categories: null,
    shops: null,
    couriers: null,
    cart: [],
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
    const getCouriers = async () => {
      if (store.couriers) return;

      const response = await GetRequest('couriers', null, false);

      if (!response) return;

      const data = await response.json();
      setStore({ ...store, couriers: data });
    };

    if (auth?.permissions?.isAdmin) getCouriers();
  }, [auth]);

  useEffect(async () => {
    const getCategories = async () => {
      if (store.categories) return;

      const response = await GetRequest('categories', null, false);

      if (!response) return;

      const data = await response.json();
      setStore({ ...store, categories: data });
    };

    const getShops = async () => {
      if (store.shops) return;

      const response = await GetRequest('shops', null, false);

      if (!response) return;

      const data = await response.json();
      setStore({ ...store, shops: data });
    };

    await getCategories();
    await getShops();
  }, [store.categories, store.shops]);

  const resetStore = () => {
    setStore({ ...initState });
  };

  return { store, setStore, isMobile, resetStore };
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
  const { store, setStore, isMobile, resetStore } = DataStore();
  const memo = useMemo(
    () => ({ store, setStore, isMobile, resetStore }),
    [store, setStore, isMobile, resetStore]
  );
  return createElement(StoreContext.Provider, { value: memo }, children);
};
