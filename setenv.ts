const { writeFile } = require('fs');
const { argv } = require('yargs');

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
	? `./src/environments/environment.prod.ts`
	: `./src/environments/environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
    production: '${process.env.PRODUCTION}',
    tokeyKeyName: '${process.env.TOKEN_KEY_NAME}',
    orderDateKeyName: '${process.env.ORDER_DATE_KEY_NAME}',
    mediagnoseAPI: {
      salt: '${process.env.MEDIAGNOSE_API_SALT}',
      url: '${process.env.MEDIAGNOSE_API_URL}',
    },
    endlessMedical: {
      checkerUrl: '${process.env.ENDLESSMEDICAL_CHECKER_URL}',
      sessionKey: '${process.env.ENDLESSMEDICAL_SESSION_KEY}',
      apiKey: '${process.env.ENDLESSMEDICAL_API_KEY}'
    }
};
`;
console.log(
	colors.magenta(
		'The file `environment.ts` will be written with the following content: \n'
	)
);
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err: any) {
	if (err) {
		throw console.error(err);
	} else {
		console.log(
			colors.magenta(
				`Angular environment.ts file generated correctly at ${targetPath} \n`
			)
		);
	}
});
