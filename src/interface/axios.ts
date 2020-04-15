/**
 * @author  x521320930@gmail.com
 * @describe utils/axios 接口存放处
 */

/**
 * @describe 基础参数接口
 */
export interface Params {
  [key: string]: any;
}

/**
 * @describe 请求传递的参数接口
 */
export interface RequestParam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (url: string, params: any, headers?: { [key: string]: any; 'Content-Type'?: string }): Promise<Params>;
}

/**
 * @describe 全局this.$api 基础接口
 */
export interface ApiParam {
  (params: Params): Promise<Params>;
}

/**
 * @describe 全局this.$api 属性接口
 */
export interface Api {
  readonly [key: string]: ApiParam;
}
