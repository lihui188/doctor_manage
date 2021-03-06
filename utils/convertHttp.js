/**
 * @author xuanzai
 * @description 判断静态文件是否为http或https开头（prefixUrl定义在public/assets/js/baseUrl.js下）
 * @param {String} url 文件路径
 * @returns {String} 文件地址
 */
import { baseUrl } from "@/global/js/baseUrl.js"
import type from '@/utils/type.js'

export default (url) => {
  const regexp = new RegExp(/^http/)
  if (regexp.test(url)) {
    return url
  } else if(type(url) != 'undefined' && url != null){
    return `${baseUrl}${url.replace(/\\/g, '/')}`
  }else{
	  return url
  }
  
}