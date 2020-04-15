/**
 * @author  x521320930@gmail.com
 * @describe 相关配置变量
 */
import { EntryNodeEnvInterface } from '@/interface/config'

export const NETWORK_PATH: string[] = [
  'meijie-81', // http://10.152.4.81:8080
  'meijie-82', // http://10.152.4.82:8080
  'meijie-92', // http://10.159.41.11:49000
  'meijie-93', // http://10.163.0.93:49000/
  'meijie-95', // http://10.163.0.95:49000/
  'meijie-112', // http://10.163.1.112:8080
  'meijie-125', // http://10.152.4.125:8080
  'meijie-138', // http://10.152.4.138:8080
  'meijie-159', // http://10.163.1.159:8080
  'meijie-171', // http://10.163.1.171:8080
  'yknew-17', // http://10.159.40.17:49000/
  'yknew-18' // http://10.159.40.18:49000/
]

const NODE_ENV = {
  development: {
    TDAppid: '37F7325F3E92D40F2000152A3006065A',
    AXIOS_BASE_URL: '/dev-api',
    JIE_URL: 'https://static-sit1.gomemyf.com/jie-h5-sit1/html'
  },
  test: {
    TDAppid: '37F7325F3E92D40F2000152A3006065A',
    AXIOS_BASE_URL: `https://static-sit1.gomemyf.com/${localStorage.getItem('env')}`,
    JIE_URL: 'https://static-sit1.gomemyf.com/jie-h5-sit1/html'
  },
  production: {
    TDAppid: 'F7EC67002BC30C5C2000152A3006059A',
    AXIOS_BASE_URL: 'https://jie.gomemyf.com',
    JIE_URL: 'https://jie.gomemyf.com/jie-h5/html'
  }
}

export const ENTRY_NODE_ENV: EntryNodeEnvInterface = NODE_ENV[process.env.NODE_ENV]
