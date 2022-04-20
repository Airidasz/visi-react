/* eslint-disable no-empty */
import {
  useState,
  useContext,
  createContext,
  createElement,
  useMemo,
} from 'react';
import jwt_decode from 'jwt-decode';

const AuthStore = () => {
  const initState = {
    user: {
      shop: null,
      admin: null,
      email: null,
      name: null,
      isSet: false,
      temp: false,
      exp: 0,
    },
    permissions: {
      isFarmer: false,
      isAdmin: false,
      isBuyer: true,
    },
  };

  const [auth, setAuth] = useState(initState);

  const setAccessToken = (accessToken) => {
    if (accessToken) {
      try {
        var decodedToken = jwt_decode(accessToken);
        decodePermissions(decodedToken.permissions);

        delete decodedToken.decodedToken;

        decodedToken.exp *= 1000; // JS dates use more numbers

        setAuth({ ...auth, user: decodedToken });

        localStorage.setItem('accessToken', accessToken);
      } catch (err) {}
    }
  };

  const decodePermissions = (persmissions) => {
    const p = persmissions.toLowerCase();

    if (p.includes('a')) auth.permissions.isAdmin = true;

    if (p.includes('f')) auth.permissions.isFarmer = true;

    if (auth.permissions.isAdmin || auth.permissions.isFarmer)
      auth.permissions.isBuyer = false;

    setAuth({ ...auth });
  };

  const resetAuth = () => {
    setAuth({ ...initState });
  };

  const isShopOwner = (shopCodename) =>
    auth?.user?.shop && auth?.user?.shop == shopCodename;

  return { auth, setAccessToken, resetAuth, isShopOwner };
};

export const AuthContext = createContext(null);

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error('authStore must be used within AuthProvider');
  }

  return store;
};

export const AuthProvider = ({ children }) => {
  const { auth, setAccessToken, resetAuth, isShopOwner } = AuthStore();
  const memo = useMemo(
    () => ({ auth, setAccessToken, resetAuth, isShopOwner }),
    [auth, setAccessToken, resetAuth]
  );

  return createElement(AuthContext.Provider, { value: memo }, children);
};
