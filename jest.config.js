/**
 * The Jest configuration object.
 * @see http://facebook.github.io/jest/docs/configuration.html
 */
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
    ],
    coveragePathIgnorePatterns: [
        ".*Tests\.ts",
        ".*Spec\.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json",
        },
    },
    moduleFileExtensions: ["js", "json", "ts"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/__test__/**/*Tests.ts"],
    transform: {
        "^.+\\.ts$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    },
    verbose: true,
};
