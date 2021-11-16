module.exports.waitAndReturnTimestamp = async (tnx) => {
  const { blockNumber } = await tnx.wait();
  const { timestamp } = await ethers.provider.getBlock(blockNumber);
  return timestamp;
};

module.exports.getTimestamp = async () => {
  const blockNumber = await ethers.provider.getBlockNumber();
  const { timestamp } = await ethers.provider.getBlock(blockNumber);
  return parseInt(timestamp);
};

module.exports.increaseEVMTimestampAndMine = async (seconds) => {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine");
};

module.exports.increaseEVMTimestamp = async (seconds) => {
  await ethers.provider.send("evm_increaseTime", [seconds]);
};
