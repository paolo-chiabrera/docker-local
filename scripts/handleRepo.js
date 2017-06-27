const fs = require('fs');
const path = require('path');

const shell = require('shelljs');

const checkoutBranch = require('./checkoutBranch');
const createFolder = require('./createFolder');

const {
	CLONED,
	ERROR
} = require('./labels');

function cloneRepo ({
	repo
}) {
	shell.exec(`git clone ${ repo }`);
	shell.echo(`${ CLONED } ${ repo }`);
}

module.exports = function handleRepo ({
	branch,
	folderPath,
	repo
}) {
	const repoName = path.parse(repo).name;
	const repoPath = path.join(folderPath, repoName);

	createFolder({
		folderPath
	});

	shell.cd(folderPath);

	if (!fs.existsSync(repoPath)) {
		cloneRepo({
			repo
		});
	}

	shell.cd(repoPath);

	checkoutBranch({
		branch,
		repoName
	});

};
