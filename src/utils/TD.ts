/**
 * @author  x521320930@gmail.com
 * @describe TD
 */
import { TDClassInterface } from '@/interface/TD'
import { ENTRY_NODE_ENV } from './config'
export default class TD implements TDClassInterface {
  TD_URL = 'https://static.gomefinance.com.cn/yika/register-activation/td-h5-website-sdk.js'
  /**
   * 初始化TD
   */
  initTD () {
    return new Promise((resolve, reject) => {
      const TD = document.createElement('script')
      TD.src = this.TD_URL
      TD.setAttribute('td-appid', ENTRY_NODE_ENV.TDAppid)
      document.body.appendChild(TD)
      TD.onload = (ev) => { resolve(ev) }
      TD.onerror = (ev) => { reject(ev) }
    })
  }

  /**
   * @describe 统计页面流量
   * @param pageId 页面自定义Id
   * @param pageTitle 页面名称
   */
  onCustomPage (pageTitle: string, pageId: string = location.origin + location.pathname): void {
    window.TDAPP.onCustomPage(pageId, pageTitle)
  }

  /**
   * @describe 事件埋点
   * @param eventId 事件id
   * @param eventLabel 事件名称
   * @param prams
   */
  onEvent (eventId: string, eventLabel: null, prams: { [key: string]: any }) {
    window.TDAPP.onEvent(eventId, eventLabel, prams)
  }
}
