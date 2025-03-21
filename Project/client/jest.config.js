/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{ diagnostics: { ignoreCodes: ['TS151001'] } }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};