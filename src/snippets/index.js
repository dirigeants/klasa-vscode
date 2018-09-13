const fs = require('fs');
const path = require('path');

class Snippet {

	constructor(loc, fields) {
		loc = path.resolve(__dirname, 'templates', loc);
		const file = fs.readFileSync(loc, 'utf8');
		this.prefix = path.basename(loc, '.js');
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
		'$2',
		'${3|true,false|}',
		'${4:1}',
		'${5:0}',
		'${6:0}',
		'${7:30000}',
		'${8|false,true|}',
		'${9|false,true|}',
		'${10|false,true|}',
		'${11|0,1,2,3,4,5,6,7,8,9,10|}',
		"'$12'",
		"'${13:No extended help available.}'",
		"'$14'",
		'${15:undefined}',
		'${16|false,true|}',
		'${17|false,true|}'
	]),

	'Create new Klasa event': new Snippet('klasaEvent.js', [
		'${1|true,false|}',
		'${4|false,true|}'
	]),

	'Create new Klasa extendable': new Snippet('klasaExtendable.js', [
		'${1|true,false|}',
		'$2',
		'${3|get ,set ,async ,static ,static async |}',
		'$4'
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
		'${5|true,false|}',
		'${6|true,false|}'
	]),

	'Create new Klasa provider': new Snippet('klasaProvider.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa task': new Snippet('klasaTask.js', [
		'${1|true,false|}'
	]),

	'Create new Klasa ignore file': new Snippet('.gitignore', []),

	'Create new Klasa config file': new Snippet('klasaConfig.js', []),

	'Create new Klasa entry file': new Snippet('klasaIndex.js', [])

};
