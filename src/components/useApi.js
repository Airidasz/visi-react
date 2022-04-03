/* eslint-disable no-undef */
import {useContext} from 'react';
import RefreshTokens from './RefreshTokens';
import { useAlert } from 'react-alert';
import { AuthContext } from './useAuth';

const useApi = () => {
  const alert = useAlert();
  const refreshToken = RefreshTokens();
  const authContext = useContext(AuthContext);

  const GetRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'GET', refresh);
  const PostRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'POST', refresh);
  const PutRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'PUT', refresh);
  const DeleteRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'DELETE', refresh);

  const ApiRequest = async (url, body, method, refresh = true) => {
    const request = async (url, body, method) => {
      const request = {
        method: method,
        credentials: 'include',
      };

      if (body)
        request.body = body;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, request);

      if (!response.ok) {
        let json = null;
        try {
          json = await response.json();
        } catch {}
        
        const error = (json && json.message) || response.statusText;
        alert.error(error);
        return false;
      }

      return response;
    };

    if (refresh && Date.now() > authContext.auth.user.exp) {
      return refreshToken(() => request(url, body, method));
    }


    return await request(url, body, method);
  };

  return { GetRequest, PostRequest, PutRequest, DeleteRequest };
};

export default useApi;
