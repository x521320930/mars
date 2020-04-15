/**
 * @author  x521320930@gmail.com
 * @describe Axios 默认配置
 */

import Axios, { AxiosPromise } from 'axios'
import qs from 'qs'
import { RequestParam } from '@/interface/axios'
import { ENTRY_NODE_ENV } from './config'
// 设置HEADERS
Axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}
// 基础配置项
const { AXIOS_BASE_URL } = ENTRY_NODE_ENV
// 默认请求的URL
Axios.defaults.baseURL = AXIOS_BASE_URL

// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
Axios.defaults.transformRequest = [
  function (data, headers) {
    const { 'Content-Type': ct } = headers
    if (data instanceof FormData) {
      return data
    } if (/application\/json/gi.test(ct)) {
      return JSON.stringify(data)
    }
    return qs.stringify(data)
  }
]

// 在传递给 then/catch 前，允许修改响应数据
Axios.defaults.transformResponse = [
  function (data) {
    // 对 data 进行任意转换处理
    return data
  }
]

// 添加请求拦截器
Axios.interceptors.request.use(
  (config) => config,
  (error) => {
    Promise.reject(error)
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  (response) => {
    const { status } = response
    if (status === 200) {
      return Promise.resolve(response.data)
    }
    return Promise.reject(response.data)
  },
  (error) => Promise.reject(error)
)

/**
 * @description 统一 GET 请求
 * @param url
 * @param params --> GET 请求参数（***?name=walid&age=25）
 */
const get: RequestParam = function (url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, { params })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description 统一 POST 请求
 * @param url
 * @param body --> POST 请求 data
 */
const post: RequestParam = function (url, params, headers) {
  return new Promise((resolve, reject) => {
    // 重置 Content-Type 类型头
    Axios.post(url, params, { headers })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description 统一 PUT 请求
 * @param url
 * @param body --> PUT 请求 data
 */
const put: RequestParam = function (url, params, headers) {
  return new Promise((resolve, reject) => {
    Axios.put(url, params, { headers })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 * @description 统一 all 请求
 * @param url function () {
      resolve([...arguments])
    })
 * @param body --> all 请求 data
 */
const all = function (body: Array<AxiosPromise>): Promise<any> {
  return new Promise((resolve, reject) => {
    Axios.all(body)
      .then(
        Axios.spread((...args) => {
          resolve(...args)
        })
      )
      .catch((r: Error): void => {
        reject(r)
      })
  })
}

export default {
  get,
  post,
  put,
  all
}
