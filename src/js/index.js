document.addEventListener("DOMContentLoaded", function() {

	console.log('👻');
	App.init(document.getElementById('container'));

	window.addEventListener("click", function(e) {
		console.log(Math.random());
	});


});