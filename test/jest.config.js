/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  rootDir: '../',
  setupFiles: ['<rootDir>/test/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.jest.ts'],
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/mocks/styleMock.ts',
    '^ui/(.*)': '<rootDir>/../../src/legacy/ui/public/$1/',
  },
  testMatch: ['**/*.test.{js,mjs,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/target/', '<rootDir>/node_modules/', '<rootDir>/build/'],
  collectCoverageFrom: [
    '<rootDir>/public/**/*.{ts,tsx}',
    '!<rootDir>/public/**/*.test.{ts,tsx}',
    '!<rootDir>/public/**/*.types.ts',
    '<rootDir>/server/**/*.{ts,tsx}',
    '!<rootDir>/server/**/*.test.{ts,tsx}',
    '!<rootDir>/server/**/*.mock.{ts,tsx}',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov', 'text', 'cobertura', 'html'],
  transform: {
    '^.+\\.(js|tsx?)$': '<rootDir>/../../src/dev/jest/babel_transform.js',
  },
  testEnvironment: 'jsdom',
};
