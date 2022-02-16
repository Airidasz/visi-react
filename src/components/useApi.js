/* eslint-disable no-undef */
import RefreshTokens from './RefreshTokens';
import { useAlert } from 'react-alert';


const useApi = () => {
  const alert = useAlert();
  const refreshToken = RefreshTokens();

  const GetRequest = async (url, body) => await ApiRequest(url, body, 'GET');
  const PostRequest = async (url, body) => await ApiRequest(url, body, 'POST');
  const PutRequest = async (url, body) => await ApiRequest(url, body, 'PUT');
  const DeleteRequest = async (url, body) => await ApiRequest(url, body, 'DELETE');

  const ApiRequest = async (url, body, method) => {
    return await refreshToken(async () => {
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
    });
  };

  return {GetRequest, PostRequest, PutRequest, DeleteRequest};
};

export default useApi;
