module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	modulePaths: ['<rootDir>'],
	collectCoverageFrom: [
		'src/**/*.tsx',
		'src/**/*.ts',
		'!src/*.js',
		'!src/*.tsx',
		'!src/models/**',
		'!**/__mocks__/**',
		'!**/__tests__/**',
		'!**/constants/**',
	],
	coverageDirectory: 'coverage',
	verbose: true,
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	moduleDirectories: ['node_modules', 'src'],
};
