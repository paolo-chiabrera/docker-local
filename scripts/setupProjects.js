const path = require('path');

const { forEach, isArray, isObject, isString } = require('lodash');
const shell = require('shelljs');

const handleRepo = require('./handleRepo');

const {
	ERROR,
	REMOVED
} = require('./labels');

function setupProjectsAux ({
	branch,
	folderPath,
	field
}) {
	if (isString(field)) {
		handleRepo({
			branch,
			folderPath,
			repo: field
		});

		return true;
	}

	if (isArray(field)) {
		forEach(field, subField => {
			setupProjectsAux({
				branch,
				folderPath,
				field: subField
			});
		});

		return true;
	}

	if (isObject(field)) {
		forEach(field, (subField, key) => setupProjectsAux({
			branch,
			folderPath: isString(subField) ? folderPath : path.join(folderPath, key),
			field: subField
		}));

		return true;
	}

	shell.echo(`${ ERROR } ${ field }`);

	return false;
}

module.exports = function setupProjects ({
	BRANCH,
	config,
	FRESH_INSTALL,
	PROJECTS_ROOT
}) {
	if (FRESH_INSTALL) {
		shell.rm('-rf', PROJECTS_ROOT);
		shell.echo(`${ REMOVED } ${ PROJECTS_ROOT }`);
	}

	return setupProjectsAux({
		branch: BRANCH,
		folderPath: PROJECTS_ROOT,
		field: config.structure
	});
};
