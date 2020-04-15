/**
 * @author  x521320930@gmail.com
 * @describe  // 通用方法
 */

/**
 * @describe 生成具体树形结构的对象
 */
export function formTree (nodes: Array<any>, id: any, link: number | string): Array<any> {
  return nodes
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: formTree(item, item.id, link) }))
}

const deviceCore = {
  _ua: navigator.userAgent,
  _detect: (kernel: string) => {
    const reg = new RegExp(kernel, 'img')
    // eslint-disable-next-line no-underscore-dangle
    return reg.test(deviceCore._ua)
  }
}

/**
 * @describe 判断设备类型
 */
export const device = {
  isIOS: () => {
    // eslint-disable-next-line no-underscore-dangle
    return deviceCore._detect('iPhone|iPad|iPod|iOS|mac os')
  },
  isAndroid: () => {
    // eslint-disable-next-line no-underscore-dangle
    return deviceCore._detect('Android')
  },
  isWeixin: () => {
    // eslint-disable-next-line no-underscore-dangle
    return deviceCore._detect('MicroMessenger')
  }
}

/**
 * @describe 获取输入框内容(手动输入/复制粘贴)
 */

export const getValue = (e: any, val: string): string => {
  let value = ''
  if (e.type === 'keyup') {
    value = val.replace(/\D/g, '')
  } else if (e.type === 'paste') {
    if (window.clipboardData && window.clipboardData.getData) {
      value = window.clipboardData.getData('Text')
    } else {
      value = e.clipboardData.getData('Text')
    }
    value = value.replace(/\D/g, '')
  }
  return value
}

/**
 * @describe 格式化输入的手机号
 */
export const formatMobile = (e: HTMLInputElement, el: any, val: string) => {
  let selStart = el.selectionStart
  const mobileLen = val.length
  let value = getValue(e, val)
  const len = value.length
  if (len > 3 && len < 8) {
    value = value.replace(/^(\d{3})/g, '$1 ')
  } else if (len >= 8) {
    value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
  }
  el.value = value
  if (selStart !== mobileLen) {
    if (selStart === 3) {
      selStart++
    }
    el.selectionStart = el.selectionEnd = selStart
  }
}
