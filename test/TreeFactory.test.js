const { solidity } = require("ethereum-waffle");
const { expect } = require("chai").use(solidity);
const { parseEther } = require("@ethersproject/units");
const { getTimestamp } = require("./helper/evm");

let treeFactory;
const treeType = {
  name: "Cinar",
  O2Rate: 100,
  price: parseEther("0.001"),
};

describe("TreeFactory", async () => {
  beforeEach(async () => {
    const TreeFactory = await ethers.getContractFactory("MockTreeFactory");
    treeFactory = await TreeFactory.deploy();

    await treeFactory.addTreeType(
      treeType.name,
      treeType.O2Rate,
      treeType.price
    );
  });

  it("should create new tree by Alice", async () => {
    const [owner, alice] = await ethers.getSigners();

    const region = "Brazil";
    const birthDate = Date.now();
    const height = 1;
    const diameter = 10;

    await treeFactory.createTree(
      alice.address,
      treeType.name,
      region,
      birthDate,
      height,
      diameter
    );

    const blockTime = await getTimestamp();

    const treeIds = await treeFactory.getTreesOf(alice.address);
    const tree = await treeFactory.getTreeById(treeIds[0]);

    expect(tree.typeName).to.be.eq(treeType.name);
    expect(tree.region).to.be.eq(region);
    expect(tree.birthDate).to.be.eq(birthDate);
    expect(tree.height).to.be.eq(height);
    expect(tree.diameter).to.be.eq(diameter);
    expect(tree.transferredAt).to.be.eq(blockTime);
  });

  it("should update tree ownership at transfer", async () => {
    const [owner, alice, bob] = await ethers.getSigners();

    const region = "Brazil";
    const birthDate = Date.now();
    const height = 1;
    const diameter = 10;

    await treeFactory.createTree(
      alice.address,
      treeType.name,
      region,
      birthDate,
      height,
      diameter
    );

    const treeIds = await treeFactory.getTreesOf(alice.address);

    await treeFactory.updateTreesOfOnTransfer(alice.address, bob.address, treeIds[0]);

    const aliceTrees = await treeFactory.getTreesOf(alice.address);
    const bobTrees = await treeFactory.getTreesOf(bob.address);

    expect(aliceTrees).to.be.lengthOf(0);
    expect(bobTrees).to.be.lengthOf(1);
    expect(bobTrees[0]).to.be.eq(treeIds[0]);
  })
});
