const fs = require('fs');
const path = require('path');

class Snippet {

	constructor(loc, fields) {
		loc = path.resolve(__dirname, 'templates', loc);
		const file = fs.readFileSync(loc, 'utf8');
		this.prefix = path.basename(loc);
		this.body = this.constructor.replaceFields(file, fields).split('\n');
	}

	static replaceFields(file, fields, i = 0) {
		if (!fields.length) return file;
		return Snippet.replaceFields(file.replace(`$${i + 1}`, fields.shift()), fields, ++i);
	}

}

module.exports = {

	'Create new Klasa command': new Snippet('klasaCommand.js', [
		'${1|true,false|}',
		'${2:0}',
		'$3',
		'${4|0,1,2,3,4,5,6,7,8,9,10|}',
		"'$5'",
		"'$6'",
		'${7:undefined}',
		"'${8:No extended help available.}'"
	]),

	'Create new Klasa event': new Snippet('klasaEvent.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa extendable': new Snippet('klasaExtendable.js', [
		'${1|true,false|}',
		'${2|false,true|}',
		'$3',
		'${4|,get ,set |}'
	]),

	'Create new Klasa finalizer': new Snippet('klasaFinalizer.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa inhibitor': new Snippet('klasaInhibitor.js', [
		'${1|true,false|}',
		'${2|false,true|}'
	]),

	'Create new Klasa language': new Snippet('klasaLanguage.js', [
		'${1|true,false|}',
		'${2:${TM_FILENAME_BASE:yourLanguageName}}'
	]),

	'Create new Klasa monitor': new Snippet('klasaMonitor.js', [
		'${1|true,false|}',
		'${2|true,false|}',
		'${3|true,false|}',
		'${4|true,false|}',
		'${5|true,false|}'
	]),

	'Create new Klasa provider': new Snippet('klasaProvider.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa task': new Snippet('klasaTask.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa entry file': new Snippet('klasaIndex.js', [
		'${1|sequential,burst|}',
		'${2|false,true|}',
		'${3:+}',
		'${4|true,false|}',
		'${5|false,true|}',
		'${6|true,false|}',
		'${7|true,false|}',
		'${8|false,true|}'
	])

};
