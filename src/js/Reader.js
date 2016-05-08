function Reader(url, targetEl) {

	/*

		Ultra simple reader for markdown documents.
		Fetches from URL (local or remote - think GitHub).
		Useful for simple text documentations. Template:

		# HEADING
		Content. Whatever. Lol.

	*/

	this.json = undefined;

	this.url = url;
	this.el = targetEl;

	this.load(this.url);

}

Reader.prototype.load = function() {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200) {
			this.json = this.getJson(xhttp.responseText);
			this.display();
		}
	}.bind(this);

	xhttp.open('GET', this.url, true);
	xhttp.send();

}

Reader.prototype.getJson = function(data) {

	var trimmed = [];
	var json = {};

	// Clean empty lines
	data.split('\n').forEach(function(line, index) {
		if(line != '') trimmed.push(line);
	});

	trimmed.forEach(function(line, index) {
		if(/^# +/.test(line)) {
			// Matches Headlines
			// And puts the entry into the json
			var heading = /(\w)(.*)$/.exec(line)[0].toLowerCase();
			json[heading] = trimmed[index+1].toLowerCase();
		}
	});

	return json;

}

Reader.prototype.display = function() {

	for (entry in this.json) {

		article = document.createElement('article');
		heading = document.createElement('h2');
		content = document.createElement('p');

		heading.innerHTML = entry;
		content.innerHTML = this.json[entry];

		article.appendChild(heading);
		article.appendChild(content);

		this.el.appendChild(article);

	}
}