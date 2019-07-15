module.exports = {
  testMatch: [`<rootDir>/**/*.test.{js,jsx,ts,tsx}`],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFiles: [
    require.resolve('../test/test-setup'),
    require.resolve('../test/test-shim'),
  ],
  verbose: true,
  transform: { '^.+\\.(ts|tsx)$': require.resolve('../test/babelTransform') },
  moduleNameMapper: {
    'exredux': '<rootDir>/../src/index.ts'
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcovonly'],
  collectCoverageFrom: [`**/*.{ts,tsx}`],
  coverageDirectory : '<rootDir>/../coverage'
}