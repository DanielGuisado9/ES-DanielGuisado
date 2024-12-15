export default {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },

    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    moduleFileExtensions: ['js', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!your-esm-module|another-esm-module).+\\.js$',],
}