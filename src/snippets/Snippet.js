const fs = require('fs');
const path = require('path');

module.exports = class Snippet {

	constructor(loc, lang, fields) {
		if (lang) {
			loc = path.resolve(__dirname, 'templates', lang, loc);
		} else {
			loc = path.resolve(__dirname, 'templates', loc);
		}
		const file = fs.readFileSync(lang ? `${loc}.${lang}` : `${loc}`, 'utf8');
		this.prefix = path.basename(loc, `.${lang}`);
		this.body = this.constructor.replaceFields(file, fields).split('\n');
	}

	static replaceFields(file, fields, i = 0) {
		if (!fields.length) return file;
		return Snippet.replaceFields(file.replace(`$${i + 1}`, fields.shift()), fields, ++i);
	}

};
