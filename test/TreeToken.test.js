const { solidity } = require("ethereum-waffle");
const { expect } = require("chai").use(solidity);
const { parseEther } = require("@ethersproject/units");
const { getTimestamp } = require("./helper/evm");

let treeToken;
const treeType = {
  name: "Cinar",
  O2Rate: 100,
  price: parseEther("0.001"),
};

describe("TreeTypes", async () => {
  beforeEach(async () => {
    const TreeToken = await ethers.getContractFactory("TreeToken");
    treeToken = await TreeToken.deploy();

    await treeToken.addTreeType(treeType.name, treeType.O2Rate, treeType.price);
  });

  it("should mint token on purchase tree", async () => {
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

    const aliceFinalBalance = await alice.getBalance();
    const aliceChargedBy = aliceInitBalance.sub(aliceFinalBalance);
    expect(aliceChargedBy).to.be.gt(treeType.price);

    const aliceTreeIds = await treeToken.getTreesOf(alice.address);
    expect(aliceTreeIds).to.be.lengthOf(1);

    const blockTime = await getTimestamp();
    const aliceTree = await treeToken.getTreeById(aliceTreeIds[0]);
    expect(aliceTree.typeName).to.be.eq(tree.typeName);
    expect(aliceTree.region).to.be.eq(tree.region);
    expect(aliceTree.birthDate).to.be.eq(tree.birthDate);
    expect(aliceTree.height).to.be.eq(tree.height);
    expect(aliceTree.diameter).to.be.eq(tree.diameter);
    expect(aliceTree.transferredAt).to.be.eq(blockTime);
  });
});
