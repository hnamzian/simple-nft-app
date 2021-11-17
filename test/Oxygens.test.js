const { solidity } = require("ethereum-waffle");
const { expect } = require("chai").use(solidity);
const { parseEther } = require("@ethersproject/units");
const { getTimestamp, increaseEVMTimestamp, increaseEVMTimestampAndMine } = require("./helper/evm");

let treeToken;
const treeType = {
  name: "Cinar",
  O2Rate: 100,
  price: parseEther("0.001"),
};

describe("Oxygens", async () => {
  beforeEach(async () => {
    const TreeToken = await ethers.getContractFactory("TreeToken");
    treeToken = await TreeToken.deploy();

    await treeToken.addTreeType(treeType.name, treeType.O2Rate, treeType.price);
  });

  it("should update oxygen balance of tree holder", async () => {
    const [owner, alice] = await ethers.getSigners();

    const aliceInitBalance = await alice.getBalance();

    const tree = {
      typeName: treeType.name,
      region: "Brazil",
      birthDate: Date.now(),
      height: 1,
      diameter: 10,
    };

    await treeToken
      .connect(alice)
      .purchaseTree(
        tree.typeName,
        tree.region,
        tree.birthDate,
        tree.height,
        tree.diameter,
        {
          value: treeType.price,
        }
      );

    const waitTime = 100;
    await increaseEVMTimestampAndMine(waitTime);

    const oxygens = await treeToken.oxygensOf(alice.address);
    const desiredO2 = waitTime * treeType.O2Rate;
    expect(oxygens).to.be.eq(desiredO2);
  });
});
