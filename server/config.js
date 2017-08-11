exports.DATABASE_URL = process.env.DATABASE_URL ||
					   global.DATABASE_URL ||
					   'mongodb://localhost/gamepiazza';

exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL || 
	'mongodb://localhost/test-gamepiazza'
);

exports.PORT = process.env.PORT || 3001;