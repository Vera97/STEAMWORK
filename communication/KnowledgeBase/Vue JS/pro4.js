let p = new Promise((resolve, reject) => {
	setTimeout(() => resolve(20), 1000)
});

(async () => {
	let a = await p
	console.log(a)
})()
