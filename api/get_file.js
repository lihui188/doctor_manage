 function isios() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('ios') !== -1 || system.indexOf('ipados') !== -1) {
		return true
	}else {
		return false
	}
}
/**
 * @author xuanzai
 * @description 选择文件
 * @param {Number} limit 文件总大小限制，默认为10MB
 * @param {Number} count 文件总数，默认为三个
 * @returns {Promise}
 */
function getFile(limit = 10, count = 3, type = "") {
	return new Promise((resolve, reject) => {
		let
			fileEle = document.createElement('input'),
			event = new MouseEvent('click')
		fileEle.type = "file"
		fileEle.accept = type || ''
		// count > 1 && (fileEle.multiple = 'multiple')
		if (type.indexOf('video') !== -1 && isios()) {
			fileEle.capture = 'camcorder'
		}
		fileEle.style.display = 'none'
		fileEle.addEventListener('change', () => {
			const fileList = fileEle.files
			let size = 0,
				arr = []
			arr.forEach.call(fileList, val => {
				size += val.size
			})
			if (fileList.length > count) {
				reject(`选择文件数量不能超过${count}个!`)
				return
			}
			if (size / (1024 ** 2) > limit) {
				reject(`文件总大小不能超过${limit}MB!`)
				return
			}
			resolve(fileList)
			document.body.removeChild(fileEle)
		})
		fileEle.dispatchEvent(event)
		document.body.appendChild(fileEle)
	})
}

export default getFile
