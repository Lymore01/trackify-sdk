import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  verbose: true,
  coverageDirectory: './tests/coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
};

export default config;
