module.exports = {
    scripts: {
      test: "jest --coverage"
    },
    jest: {
      collectCoverage: true,
      coverageDirectory: "coverage",
      coverageReporters: ["json", "lcov", "text", "clover"],
      testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
      ]
    }
  };