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
        "index.ts",
        "src/units/.*"
    ],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: 95,
        },
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "src/tsconfig.json",
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
