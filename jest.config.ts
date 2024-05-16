import type { Config } from "jest";

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coveragePathIgnorePatterns: [".*Tests\\.ts", ".*Spec\\.ts", "index.ts", "src/quantity/.*"],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 99,
            lines: 99,
            statements: 99,
        },
    },
    moduleFileExtensions: ["js", "json", "ts"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/__test__/**/*Tests.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    verbose: true,
};

export default config;
