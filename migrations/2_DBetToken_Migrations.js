const DBet = artifacts.require("DBet");
const TokenVesting = artifacts.require("TokenVesting");

module.exports = async function (deployer) {
  await deployer.deploy(DBet);
  const token = await DBet.deployed();
  
  await deployer.deploy(TokenVesting, token.address);
  await TokenVesting.deployed();
};

// module.export = async function (deployer){
//     await deployer.deploy(TokenVesting, DBet.address);
//     const vesting = await TokenVesting.deployed();
// };