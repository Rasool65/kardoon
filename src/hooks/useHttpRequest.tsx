import themeConfig from '@src/configs/theme/themeConfig';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAxios } from './useAxios';
import { useToast } from './useToast';

export enum RequestDataType {
  json,
  formData,
}

const useHttpRequest = (dataType: RequestDataType = RequestDataType.json) => {
  const { get, post, remove, put } = useAxios(dataType);
  const toast = useToast();

  const getRequest = <T extends object>(
    url: string,
    onError?: Function,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await get<T>(url, {
          validateStatus: (status: number): boolean => {
            return status >= 200 && status <= 204;
          },
          ...config,
        });
        if (res.status >= 200 && res.status <= 204) {
          if (themeConfig.app.autoServerMessageOnError && res.data && res.data.message && !res.data.succeeded)
            toast.showWarning(res.data.message);
        }
        resolve(res);
      } catch (error: any) {
        if (onError) onError();
        else if (themeConfig.app.showSystemError) toast.showError(error.message);
        reject(error);
      }
    });
  };

  const postRequest = <T extends object>(
    url: string,
    body: any,
    onError?: Function,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await post<T>(url, body, {
          validateStatus: (status: number): boolean => {
            return status >= 200 && status <= 204;
          },
          ...config,
        });
        if (res.status >= 200 && res.status <= 204) {
          if (themeConfig.app.autoServerMessageOnError && res.data && res.data.message && !res.data.succeeded)
            toast.showWarning(res.data.message);
        }
        resolve(res);
      } catch (error: any) {
        if (onError) onError();
        else if (themeConfig.app.showSystemError) toast.showError(error.message);
        reject(error);
      }
    });
  };

  const deleteRequest = <T extends object>(url: string, body?: any, onError?: Function): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await remove<T>(url, {
          validateStatus: (status: number): boolean => {
            return status >= 200 && status <= 204;
          },
          data: body,
        });
        if (res.status >= 200 && res.status <= 204) {
          if (themeConfig.app.autoServerMessageOnError && res.data && res.data.message && !res.data.succeeded)
            toast.showWarning(res.data.message);
        }
        resolve(res);
      } catch (error: any) {
        if (onError) onError();
        else if (themeConfig.app.showSystemError) toast.showError(error.message);
        reject(error);
      }
    });
  };

  const updateRequest = <T extends object>(url: string, body?: any, onError?: Function): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await put<T>(url, body, {
          validateStatus: (status: number): boolean => {
            return status >= 200 && status <= 204;
          },
        });
        if (res.status >= 200 && res.status <= 204) {
          if (themeConfig.app.autoServerMessageOnError && res.data && res.data.message && !res.data.succeeded)
            toast.showWarning(res.data.message);
        }
        resolve(res);
      } catch (error: any) {
        if (onError) onError();
        else if (themeConfig.app.showSystemError) toast.showError(error.message);
        reject(error);
      }
    });
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
  };
};

export default useHttpRequest;
