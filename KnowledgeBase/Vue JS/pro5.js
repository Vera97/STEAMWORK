function get(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(x), 2000);
	});
}

(async () => {
	let a = await get(2);
	console.log(a);
})();