const { solidity } = require("ethereum-waffle");
const { expect } = require("chai").use(solidity);
const { parseEther } = require("@ethersproject/units");

let treeTypes;

describe("TreeTypes", async () => {
  beforeEach(async () => {
    const TreeTypes = await ethers.getContractFactory("TreeTypes");
    treeTypes = await TreeTypes.deploy();
  });

  it("should add new tree type by owner", async () => {
    const treeType = {
      name: "Cinar",
      O2Rate: 100,
      price: parseEther("0.001"),
    };
    await treeTypes.addTreeType(treeType.name, treeType.O2Rate, treeType.price);

    const storedTreeType = await treeTypes.getTreeTypeByName(treeType.name);

    expect(storedTreeType.name).to.be.eq(treeType.name);
    expect(storedTreeType.O2Rate).to.be.eq(treeType.O2Rate);
    expect(storedTreeType.price).to.be.eq(treeType.price);
  });

  it("should remove existing tree type by owner", async () => {
    const treeType = {
      name: "Cinar",
      O2Rate: 100,
      price: parseEther("0.001"),
    };
    await treeTypes.addTreeType(treeType.name, treeType.O2Rate, treeType.price);
    await treeTypes.removeTreeTypeByName(treeType.name);

    expect(treeTypes.getTreeTypeByName(treeType.name)).revertedWith(
      "tree type name does not exist"
    );
  });
});
