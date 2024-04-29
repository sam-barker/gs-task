const options = [
  '--require-module ts-node/register',
  '--require ./tests/steps/*.steps.ts',
  '--format progress',
].join(' ')

const runFeatures = ['./tests/features/', options].join(' ')

module.exports = {
  test_runner: runFeatures,
}
