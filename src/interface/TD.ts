/**
 * @author  x521320930@gmail.com
 * @describe utils/TD 接口存放处
 */

/**
 * @describe 基础接口
 */
export interface TDinterface {
  onCustomPage(id: string, ctx: string): void;
  onEvent(id: string, ctx: null, prams: { [key: string]: any }): void;
}

/**
 * @describe 继承基础接口并对 Class 进行约束
 */
export interface TDClassInterface extends TDinterface {
  readonly TD_URL: string;
  initTD (): Promise<any>;
}
