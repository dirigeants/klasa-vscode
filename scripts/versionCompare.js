const [, , oldVer, newVer] = process.argv;
const versionSignature = /^(\d+)\.(\d+)\.(\d+)$/;

if (!oldVer || !newVer || !versionSignature.test(oldVer) || !versionSignature.test(newVer)) {
	console.error('invalid cli parameters');
	process.exitCode = 1;
} else {
	const oldSplit = oldVer.split('.').map(ver => parseInt(ver));
	const newSplit = newVer.split('.').map(ver => parseInt(ver));

	for (let i = 0; i < 3; i++) {
		if (newSplit[i] < oldSplit[i]) {
			console.error('oldversion is < to newversion');
			process.exitCode = 1;
			break;
		}
	}

	if (newSplit[0] === oldSplit[0] && newSplit[1] === oldSplit[1] && newSplit[2] === oldSplit[2]) {
		console.error('oldversion is === to newversion');
		process.exitCode = 1;
	}
}
