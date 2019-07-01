let a = new Promise((resolve, reject) => {
	setTimeout(() => resolve(100), 1000)
})
.then(res => {
	console.log(res)
	res *= 2
	return res
})
.then(res => {
	console.log(res)
	res *= 2
	return res
})
.then(res => {
	console.log(res)
	res *= 2
	return res
})
