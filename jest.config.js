module.exports = {
    testEnvironment: "node",
    verbose: true,
    preset: "ts-jest",
    clearMocks: true,
    setupFileAfterEnv: "./src/lib/prisma/client.mock.ts"
};
