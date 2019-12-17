module.exports = {
	hellox: function (req, res, next) {
		console.log('hello');
		res.status(200);
		res.json({
			data: 'hello world'
		})
	}
}