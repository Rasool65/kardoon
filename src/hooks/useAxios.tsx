import { IJwtConfig } from '@src/configs/jwt/IJwtConfig';
import jwtDefaultConfig from '@src/configs/jwt/jwtDefaultConfig';
import themeConfig from '@src/configs/theme/themeConfig';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../configs/apiConfig/apiBaseUrl';
import { URL_LOGIN } from '../configs/urls';
import { RequestDataType } from './useHttpRequest';
import { useToast } from './useToast';
import { useTokenAuthentication } from './useTokenAuthentication';

let delayBetweenErrors: number;
let lastErrorTime: number = 0;

export const useAxios = (dataType: RequestDataType = RequestDataType.json) => {
  const navigate = useNavigate();

  const jwtConfig: IJwtConfig = { ...jwtDefaultConfig };

  const authToken = useTokenAuthentication();
  const toast = useToast();

  let instance: AxiosInstance;
  const token = authToken.getToken();

  let subscribers: any[] = [];
  var isAlreadyFetchingAccessToken = false;

  let headers: AxiosRequestHeaders = {};

  if (dataType == RequestDataType.json) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  } else if (dataType == RequestDataType.formData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  if (token && token != '') {
    headers['Authorization'] = `${jwtConfig.tokenType} ${token}`.trim();
  }

  instance = axios.create({
    baseURL: API_BASE_URL,
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { config, response } = error;
      const originalRequest = config;

      delayBetweenErrors = Date.now() - lastErrorTime;
      lastErrorTime = Date.now();

      if (response && response.status === 401 && delayBetweenErrors > 500) {
        if (!themeConfig.app.useRefreshToken) {
          toast.showError('لطفا مجدد وارد حساب کاربری خود شوید');
          authToken.deleteLogoutToken();
          navigate(URL_LOGIN);
        }
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          refreshToken().then((r) => {
            isAlreadyFetchingAccessToken = false;

            authToken.saveLoginToken(r.data.accessToken, r.data.refreshToken);

            subscribers = subscribers.filter((callback) => callback(r.data.accessToken));
          });
        } else {
          toast.showError('لطفا مجدد وارد حساب کاربری خود شوید');
          authToken.deleteLogoutToken();
          navigate(URL_LOGIN);
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((accessToken: string) => {
            originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      }

      if (response && response.status === 400 && delayBetweenErrors > 500) {
        if (response.data.message && themeConfig.app.autoServerMessageOnError) toast.showError(response.data.message);
      }

      if (response && response.status === 500 && delayBetweenErrors > 500) {
        toast.showError('در ارتباط با سرور مشکلی روی داده است');
      }
      return Promise.reject(error);
    }
  );

  const addSubscriber = (callback: any) => {
    subscribers.push(callback);
  };

  const refreshToken = () => {
    return axios.post(jwtConfig.refreshEndpoint, {
      refreshToken: authToken.getRefreshToken(),
    });
  };

  const get = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
  };

  const post = <T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data, config);
  };

  const put = <T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data, config);
  };

  const remove = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
  };

  return {
    get,
    post,
    put,
    remove,
  };
};
