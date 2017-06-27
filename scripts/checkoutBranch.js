const fs = require('fs');
const path = require('path');

const shell = require('shelljs');

const DEFAULT_BRANCH = 'dev';

const {
	NO_CHANGES,
	UPDATED
} = require('./labels');

function isBranchUpToDate (cmd) {
	return cmd.code === 0 && cmd.stdout.indexOf('up-to-date') >= 0;
};

function remoteBranchExists (branch) {
	const cmd = `git ls-remote --heads origin ${ branch } | wc -l`;

	const { code, stdout } = shell.exec(cmd, {
		silent: true
	});

	return code === 0 && parseInt(stdout) === 1;
};

module.exports = function checkoutBranch ({
	branch,
	repoName
}) {
	let status = NO_CHANGES;

	const _branch = remoteBranchExists(branch) ? branch : DEFAULT_BRANCH;

	const checkoutCMD = shell.exec(`git checkout ${ _branch }`);

	if (!isBranchUpToDate(checkoutCMD)) {
		shell.exec(`git pull`);
		status = UPDATED;
	}

	shell.echo(`${ status } ${ repoName } (${ _branch })`);
};
