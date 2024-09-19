module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['html', 'text-summary'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/main.ts']
};
