export default {
    // Configura o Jest para testes no Node.js
    // usando Typescript.
    preset: "tsЋjest",
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "tsЋjest",
    },
    // Informa o diretório onde os testes estarão contidos.
    roots: ["<rootDir>/tests"],
    // Configurações de cobertura de código.
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
};