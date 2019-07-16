module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [`**/*.{ts,tsx}`],
  coverageDirectory: '<rootDir>/../coverage',
  coverageReporters: ['json', 'html', 'lcovonly'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: { exredux: '<rootDir>/../src/index.ts' },
  setupFiles: [require.resolve('../test/test-setup'), require.resolve('../test/test-shim')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [`<rootDir>/**/*.test.{js,jsx,ts,tsx}`],
  transform: { '^.+\\.(ts|tsx)$': require.resolve('../test/babelTransform') },
  verbose: true
};
