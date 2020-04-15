/**
 * @author  x521320930@gmail.com
 * @describe  // 微信相关接口
 * @example 模块名称_接口 命名
 */
import { Params } from '@/interface/axios'
import Axios from '@/utils/axios'
// 获取appid
export const wx_get_appid = (params: Params) => {
  return Axios.post('/gmcf/v1/h5/weixin/get/appid', params)
}
// 通过公众号链接，获取应跳转页面接口
export const wx_page_url = (params: Params) => {
  return Axios.post('/gmcf/v1/h5/weixin/page/url', params)
}

// 获取验证码
export const wx_sendSmsCode = (params: Params) => {
  return Axios.post('/gmcf/v1/h5/weixin/sendSmsCode', params)
}

// 验证验证码接口
export const wx_smsRegOrLog = (params: Params) => {
  return Axios.post('/gmcf/v1/h5/weixin/smsRegOrLog', params)
}

// 获取图形验证码
export const wx_getImageCode = (params: Params) => {
  return Axios.post('/gmcf/v1/h5/unitedPass/getImageCode', params)
}
