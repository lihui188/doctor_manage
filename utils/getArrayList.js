import type from '@/utils/type.js'
export default (arr) => {
	
  if (type(arr) == 'string') {
    return arr.split(',')
  }else{
	  return arr
  }
  
}