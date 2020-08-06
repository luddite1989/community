var fileUtil = {
	//保存图片
	saveImage(url) {
		uni.downloadFile({
			url: url,
			success: res => {
				if (res.statusCode === 200) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						},
						fail: function() {
							uni.showToast({
								title: '保存失败，请稍后重试',
								icon: 'none'
							});
						}
					});
				}
			}
		});
	},
	//预览图片
	previewImage(index, urls, success) {
		uni.previewImage({
			current: index,
			urls: urls,
			indicator: 'number',
			longPressActions: {
				itemList: ['保存图片'],
				success: data => {
					success(data)
				},
				fail: error => {
					console.log(err.errMsg);
				}
			}
		});
	}
}

export default fileUtil;