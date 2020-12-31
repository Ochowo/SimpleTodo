module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', './app.js', 'tests', 'src/messaging'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
