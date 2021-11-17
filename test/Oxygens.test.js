const { solidity } = require("ethereum-waffle");
const { expect } = require("chai").use(solidity);
const { parseEther } = require("@ethersproject/units");
const {
  getTimestamp,
  increaseEVMTimestamp,
  increaseEVMTimestampAndMine,
} = require("./helper/evm");

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

  it("should update oxygen balance of tree holder after transfering tree", async () => {
    const [owner, alice, bob] = await ethers.getSigners();

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

    const whenAlicePurchasedTree = await getTimestamp();

    const waitTime = 100;
    await increaseEVMTimestampAndMine(waitTime);

    const treeIds = await treeToken.getTreesOf(alice.address);
    await treeToken.connect(alice).approve(bob.address, treeIds[0]);
    await treeToken
      .connect(bob)
      .transferFrom(alice.address, bob.address, treeIds[0]);

    const whenAliceTransferredTreeToBob = await getTimestamp();
    const aliceDesiredO2 =
      (whenAliceTransferredTreeToBob - whenAlicePurchasedTree) *
      treeType.O2Rate;

    await increaseEVMTimestampAndMine(waitTime);

    const whenBobClaimedOxygens = await getTimestamp();

    const bobDesiredO2 =
      (whenBobClaimedOxygens - whenAliceTransferredTreeToBob) * treeType.O2Rate;

    const aliceO2 = await treeToken.oxygensOf(alice.address);
    const bobO2 = await treeToken.oxygensOf(bob.address);
    expect(aliceO2).to.be.eq(aliceDesiredO2);
    expect(bobO2).to.be.eq(bobDesiredO2);
  });
});
