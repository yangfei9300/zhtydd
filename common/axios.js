//封装请求文件
export default {
	axios(method, url, data) {
		uni.showLoading({
			'title': '加载中'
		})
		var header = {
			'Content-Type': 'application/json;charset=utf-8'
		};
		var token = uni.getStorageSync("token");
		if (token) {
			header.Authorization = token;
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: data,
				header: header,
				success: (res) => {
					if (res.data.code == 401) {
						uni.showToast({
							title: "登录超时请重新登录",
							icon: 'none'
						})
						setTimeout(res => {
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}, 1000)
					} else {
						resolve(res.data)
					}
				},
				fail: (err) => {
					reject(err)
				},
				complete() {
					wx.hideLoading()
				}
			})
		})
	},

	axiosDate(method, url, data) {
		uni.showLoading({
			'title': '加载中'
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: data,
				header: {
					'Content-Type': 'application/json;charset=utf-8',
					'auth': uni.getStorageSync("DataHt")
				},
				success: (res) => {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {
					wx.hideLoading()
				}
			})
		})
	},
	axiosUpload(url, imgurl, data) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: url, //仅为示例，非真实的接口地址
				filePath: imgurl,
				name: 'file',
				header: {},
				formData: data,
				success: (uploadFileRes) => {
					var res = JSON.parse(uploadFileRes.data)
					resolve(res)
				}
			});

		})
	},

}