import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  testEnvironment: 'node',

  roots: ['<rootDir>/src'],

  testMatch: ['**/services/slices/**/*.test.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ],
    '\\.module\\.css$': 'jest-css-modules-transform'
  },

  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1'
  },

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov', 'json-summary'],

  collectCoverageFrom: ['src/services/slices/**/*.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;