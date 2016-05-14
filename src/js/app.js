var App = {

	container: undefined,

	init: function(container) {
		this.container = container;
		Loader.init();
		this.initialLoad();
	},

	initialLoad: function() {
		Loader.load([
			{id: 'homepage', src: 'data/homepage.html'}
		], this.loadCompleted.bind(this)); // Binding allows to keep the App scope on callback
	},

	loadCompleted: function() {
		this.container.innerHTML = Loader.getContentById('homepage');
		this.initialTransitionIn();
		documentation = new Reader('https://raw.githubusercontent.com/thmsbfft/oryoki-website/master/USER-MANUAL.md', this.container.querySelectorAll('.documentation')[0]);
	},

	initialTransitionIn: function() {
		this.container.classList.add('fade-in');
	},

	dispose: function() {
		this.container.innerHTML = '';
	}

};