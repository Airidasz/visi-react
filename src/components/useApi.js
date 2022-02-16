/* eslint-disable no-undef */
import RefreshTokens from './RefreshTokens';
import { useAlert } from 'react-alert';


const useApi = () => {
  const alert = useAlert();
  const refreshToken = RefreshTokens();

  const GetRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'GET', refresh);
  const PostRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'POST', refresh);
  const PutRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'PUT' , refresh);
  const DeleteRequest = async (url, body, refresh = true) => await ApiRequest(url, body, 'DELETE', refresh);

  const ApiRequest = async (url, body, method, refresh = true) => {
    let func = async () => {
      const request = {
        method: method,
        credentials: 'include',
      };

      if(body)
        request.body = body;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, request);
        
      if (!response.ok) {
        const json = await response.json();
        const error = (json && json.message) || response.statusText;
        alert.error(error);
        return false;
      }

      return response;
    };

    if(refresh)
      func = refreshToken(func);

    return await func();
  };

  return {GetRequest, PostRequest, PutRequest, DeleteRequest};
};

export default useApi;
