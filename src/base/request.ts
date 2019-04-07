import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Message } from 'element-ui';
import _ from './utils';

const JSONAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
  },
  transformRequest: [data => JSON.stringify(_.filterEmpty(data))],
  paramsSerializer(params) {
    return qs.stringify(_.filterEmpty(params));
  },
});

const FORMAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  transformRequest: [data => qs.stringify(_.filterEmpty(data), { arrayFormat: 'repeat' })],
});

const FORMDATAAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
});

function __responseSuccessInterceptor(response: any) {
  const { data } = response;
  if (data && data.code >= 200 && data.code < 400) {
    if (data.message) {
      Message.success(data.message);
    }
    return Promise.resolve(data);
  }

  const err = new Error(`code: ${data.code}; message: ${data.message}; url: ${response.config.url}`);
  err.name = '后端请求错误';

  const { handleRequestError = null } = Vue.klvue || {};

  if (handleRequestError) {
    handleRequestError(data, err);
  }

  if (data.message) {
    Message.error(data.message);
  }
  return Promise.reject(data);
}

function __responseErrorInterceptor(error: any) {
  if (error.response) {
    Message.error('请求失败');
  }
  return Promise.reject(error);
}

FORMAXIOS.interceptors.response.use(__responseSuccessInterceptor, __responseErrorInterceptor);
JSONAXIOS.interceptors.response.use(__responseSuccessInterceptor, __responseErrorInterceptor);
FORMDATAAXIOS.interceptors.response.use(__responseSuccessInterceptor, __responseErrorInterceptor);

export const FORMAPI = FORMAXIOS;
export const JSONAPI = JSONAXIOS;
export const FORMDATAAPI = FORMDATAAXIOS;
