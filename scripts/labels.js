const chalk = require('chalk');

module.exports = {
	CLONED: chalk.green('[Cloned]'),
	CREATED: chalk.green('[Created]'),
	ERROR: chalk.red('[Error]'),
	EXISTS: chalk.yellow('[Already exists]'),
	NO_CHANGES: chalk.green('[No changes]'),
	REMOVED: chalk.red('[Removed]'),
	UPDATED: chalk.yellow('[Updated]')
};
