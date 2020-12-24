import Vue from 'vue'
// 引入二次封装的axios模块
import Http from '@/api/http'
import get_file_image from '@/api/get_file_image.js'
import '@/global/css/style.css'

Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file

Vue.prototype.$getImgFile = get_file_image.getImgFile

// 引入storage
import Storage from '@/api/storage'

Vue.prototype.$setMemoryPmt = Storage.setMemoryPmt
Vue.prototype.$getMemoryPmt = Storage.getMemoryPmt
Vue.prototype.$clearMemoryPmt = Storage.clearMemoryPmt

// 引入date
import wxLogin from '@/api/wx_login'
Vue.prototype.$wxLogin = wxLogin

import date from '@/api/date'
Vue.prototype.$formatDate = date.formatDate
Vue.prototype.$dateDiff = date.dateDiff
Vue.prototype.$setDay = date.setDay
Vue.prototype.$setMonth = date.setMonth
Vue.prototype.$setYear = date.setYear
Vue.prototype.$setDate = date.setDate
Vue.prototype.$fromNow = date.fromNow