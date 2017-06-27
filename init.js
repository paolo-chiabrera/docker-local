const path = require('path');

const shell = require('shelljs');

const setupProjects = require('./scripts/setupProjects');

const config = require('./config.json');

const FRESH_INSTALL = true;

const BRANCH = 'dev';

const PROJECTS_ROOT = path.resolve(__dirname, './projects');

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
}

setupProjects({
	BRANCH,
	config,
	FRESH_INSTALL,
	PROJECTS_ROOT
});
