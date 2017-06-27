const fs = require('fs');

const shell = require('shelljs');

const {
	CREATED,
	EXISTS
} = require('./labels');

module.exports = function createFolder ({
	folderPath
}) {
	if (!fs.existsSync(folderPath)) {
		shell.mkdir('-p', folderPath);
		shell.echo(`${ CREATED } ${ folderPath }`);

		return true;
	}

	// shell.echo(`${ EXISTS } ${ folderPath }`);

	return false;
};
