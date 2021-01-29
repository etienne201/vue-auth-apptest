module.exports = {
  testEnvironment: 'node',
   
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testPathIgnorePatterns:['/utils/']
}
 