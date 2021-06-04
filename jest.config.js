module.exports = {
  testPathIgnorePatterns: ["<rootDir>/cypress"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  modulePaths: ["<rootDir>/src"],
  testEnvironment: "jsdom",
}
