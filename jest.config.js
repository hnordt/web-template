module.exports = {
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },
}
