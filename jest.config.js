module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    },
    './components/**/*.tsx': {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  watchPlugins:[
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ]
};